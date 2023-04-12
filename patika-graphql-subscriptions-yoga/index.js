const { GraphQLServer, withFilter } = require("graphql-yoga");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 3);

const { users, events, locations, participants } = require("./data");

const pubsub = require("./pubsub");

const typeDefs = `
  # All
  type DeleteAllOutput {
    count: Int!
  }

  # User
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String!
    email: String!
  }

  # Event
  type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    location: Location!
    user: User!
    participants: [Participant!]!
  }

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  input UpdateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  # Location
  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input UpdateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  # Participant
  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
    user: User!
    event: Event!
  }

  input CreateParticipantInput {
    user_id: Int!
    event_id: Int!
  }

  input UpdateParticipantInput {
    user_id: Int!
    event_id: Int!
  }

  type Query {
    # User
    users: [User]!
    user(id: Int!): User

    # Event
    events: [Event]!
    event(id: Int!): Event

    # Location
    locations: [Location]!
    location(id: Int!): Location

    # Participant
    participants: [Participant]!
    participant(id: Int!): Participant
  }

  type Mutation {
    # User
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
    deleteAllUsers: DeleteAllOutput!

    # Event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: Int!, data: UpdateEventInput!): Event!
    deleteEvent(id: Int!): Event!
    deleteAllEvents: DeleteAllOutput!

    # Location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: Int!, data: UpdateLocationInput): Location!
    deleteLocation(id: Int!): Location!
    deleteAllLocations: DeleteAllOutput!

    # Participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: Int!, data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: Int!): Participant!
    deleteAllParticipants: DeleteAllOutput!
  }

  type Subscription {
    # User
    userCreated: User!
    userUpdated: User!
    userDeleted: User!
    userCount: Int!

    # Event
    eventCreated (user_id: Int): Event!
    eventUpdated: Event!
    eventDeleted: Event!
    eventCount: Int!

    # Location
    locationCreated: Location!
    locationUpdated: Location!
    locationDeleted: Location!
    locationCount: Int!

    # Participant
    participantCreated: Participant!
    participantUpdated: Participant!
    participantDeleted: Participant!
    participantCount: Int!
  }
`;

const resolvers = {
  Query: {
    // User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    // Event
    events: () => events,
    event: (parent, args) => events.find((event) => event.id === args.id),

    // Location
    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id === args.id),

    // Participant
    participants: () => participants,
    participant: (parent, args) =>
      participants.find((participant) => participant.id === args.id),
  },

  User: {
    events: (parent, args) =>
      events.filter((event) => event.user_id === parent.id),
  },

  Event: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    location: (parent, args) =>
      locations.find((location) => location.id === parent.location_id),
    participants: (parent, args) =>
      participants.filter((participant) => participant.event_id === parent.id),
  },

  Participant: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    event: (parent, args) =>
      events.find((event) => event.id === parent.event_id),
  },

  Mutation: {
    // User
    createUser: (parent, args, context) => {
      const user = {
        id: nanoid(),
        ...args.data,
      };
      users.push(user);
      context.pubsub.publish("userCreated", { userCreated: user });
      context.pubsub.publish("userCount", { userCount: users.length });
      return user;
    },
    updateUser: (parent, args, context) => {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User Not Found!");

      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...args.data,
      });
      context.pubsub.publish("userUpdated", { userUpdated: updatedUser });
      return updatedUser;
    },
    deleteUser: (parent, args, context) => {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User Not Found!");

      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      context.pubsub.publish("userDeleted", { userDeleted: deletedUser });
      context.pubsub.publish("userCount", { userCount: users.length });
      return deletedUser;
    },
    deleteAllUsers: (parent, args, context) => {
      const usersCount = users.length;
      users.splice(0, usersCount);
      context.pubsub.publish("userCount", { userCount: users.length });
      return { count: usersCount };
    },

    // Event
    createEvent: (parent, args, context) => {
      const event = {
        id: nanoid(),
        ...args.data,
      };
      events.push(event);
      context.pubsub.publish("eventCreated", { eventCreated: event });
      context.pubsub.publish("eventCount", { eventCount: events.length });
      return event;
    },
    updateEvent: (parent, args, context) => {
      const eventIndex = events.findIndex((event) => event.id === args.id);

      if (eventIndex === -1) throw new Error("Event Not Found!");

      const updatedEvent = (events[eventIndex] = {
        ...events[eventIndex],
        ...args.data,
      });
      context.pubsub.publish("eventUpdated", { eventUpdated: updatedEvent });
      return updatedEvent;
    },
    deleteEvent: (parent, args, context) => {
      const eventIndex = events.findIndex((event) => event.id === args.id);

      if (eventIndex === -1) throw new Error("Event Not Found!");

      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);
      context.pubsub.publish("eventDeleted", { eventDeleted: deletedEvent });
      context.pubsub.publish("eventCount", { eventCount: events.length });
      return deletedEvent;
    },
    deleteAllEvents: (parent, args, context) => {
      const eventsCount = events.length;
      events.splice(0, eventsCount);
      context.pubsub.publish("eventCount", { eventCount: events.length });
      return { count: eventsCount };
    },

    // Location
    createLocation: (parent, args, context) => {
      const location = {
        id: nanoid(),
        ...args.data,
      };
      locations.push(location);
      context.pubsub.publish("locationCreated", { locationCreated: location });
      context.pubsub.publish("locationCount", {
        locationCount: locations.length,
      });
      return location;
    },
    updateLocation: (parent, args, context) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === args.id
      );

      if (locationIndex === -1) throw new Error("Location Not Found!");

      const updatedLocation = (locations[locationIndex] = {
        ...locations[locationIndex],
        ...args.data,
      });
      context.pubsub.publish("locationUpdated", {
        locationUpdated: updatedLocation,
      });
      return updatedLocation;
    },
    deleteLocation: (parent, args, context) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === args.id
      );

      if (locationIndex === -1) throw new Error("Location Not Found!");

      const deletedLocation = locations[locationIndex];
      locations.splice(locationIndex, 1);
      context.pubsub.publish("locationDeleted", {
        locationDeleted: deletedLocation,
      });
      context.pubsub.publish("locationCount", {
        locationCount: locations.length,
      });
      return deletedLocation;
    },
    deleteAllLocations: (parent, args, context) => {
      const locationsCount = locations.length;
      locations.splice(0, locationsCount);
      context.pubsub.publish("locationCount", {
        locationCount: locations.length,
      });
      return { count: locationsCount };
    },

    // Participant
    createParticipant: (parent, args, context) => {
      const participant = {
        id: nanoid(),
        ...args.data,
      };
      participants.push(participant);
      context.pubsub.publish("participantCreated", {participantCreated:participant})
      context.pubsub.publish("participantCount", {participantCount:participants.length})
      return participant;
    },
    updateParticipant: (parent, args, context) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === args.id
      );

      if (participantIndex === -1) throw new Error("Participant Not Found!");

      const updatedParticipant = (participants[participantIndex] = {
        ...participants[participantIndex],
        ...args.data,
      });
      context.pubsub.publish("participantUpdated", {participantUpdated:updatedParticipant})
      return updatedParticipant;
    },
    deleteParticipant: (parent, args, context) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === args.id
      );

      if (participantIndex === -1) throw new Error("Participant Not Found!");

      const deletedParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);
      context.pubsub.publish("participantDeleted", {participantDeleted:deletedParticipant})
      context.pubsub.publish("participantCount", {participantCount:participants.length})
      return deletedParticipant;
    },
    deleteAllParticipants: (parent, args, context) => {
      const participantsCount = participants.length;
      participants.splice(0, participantsCount);
      context.pubsub.publish("participantCount", {participantCount:participants.length})
      return { count: participantsCount };
    },
  },

  Subscription: {
    // User
    userCreated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("userCreated"),
    },
    userUpdated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("userUpdated"),
    },
    userDeleted: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("userDeleted"),
    },
    userCount: {
      subscribe: (parent, args, context) => {
        setTimeout(() => {
          context.pubsub.publish("userCount", { userCount: users.length });
        });

        return context.pubsub.asyncIterator("userCount");
      },
    },

    // Event
    eventCreated: {
      subscribe: withFilter(
        (parent, args, context) => context.pubsub.asyncIterator("eventCreated"),
        (payload, variables) => {
          return variables.user_id
            ? payload.eventCreated.user_id === variables.user_id
            : true;
        }
      ),
    },
    eventUpdated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("eventUpdated"),
    },
    eventDeleted: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("eventDeleted"),
    },
    eventCount: {
      subscribe: (parent, args, context) => {
        setTimeout(() => {
          context.pubsub.publish("eventCount", { eventCount: events.length });
        });

        return context.pubsub.asyncIterator("eventCount");
      },
    },

    // Location
    locationCreated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("locationCreated"),
    },

    locationUpdated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("locationUpdated"),
    },
    locationDeleted: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("locationDeleted"),
    },
    locationCount: {
      subscribe: (parent, args, context) => {
        setTimeout(() => {
          context.pubsub.publish("locationCount", {
            locationCount: events.length,
          });
        });

        return context.pubsub.asyncIterator("locationCount");
      },
    },

    // Participant
    participantCreated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("participantCreated"),
    },

    participantUpdated: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("participantUpdated"),
    },
    participantDeleted: {
      subscribe: (parent, args, context) =>
        context.pubsub.asyncIterator("participantDeleted"),
    },
    participantCount: {
      subscribe: (parent, args, context) => {
        setTimeout(() => {
          context.pubsub.publish("participantCount", {
            locationCount: events.length,
          });
        });

        return context.pubsub.asyncIterator("participantCount");
      },
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server is running on localhost:4000"));
