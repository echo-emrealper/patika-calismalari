const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 3);

const { users, events, locations, participants } = require("./data");

const typeDefs = gql`
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
    createUser: (parent, args) => {
      const user = {
        id: nanoid(),
        ...args.data,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, args) => {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User Not Found!");

      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...args.data,
      });

      return updatedUser;
    },
    deleteUser: (parent, args) => {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User Not Found!");

      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      return deletedUser;
    },
    deleteAllUsers: () => {
      const usersCount = users.length;
      users.splice(0, usersCount);
      return { count: usersCount };
    },

    // Event
    createEvent: (parent, args) => {
      const event = {
        id: nanoid(),
        ...args.data,
      };
      events.push(event);
      return event;
    },
    updateEvent: (parent, args) => {
      const eventIndex = events.findIndex((event) => event.id === args.id);

      if (eventIndex === -1) throw new Error("Event Not Found!");

      const updatedEvent = (events[eventIndex] = {
        ...events[eventIndex],
        ...args.data,
      });

      return updatedEvent;
    },
    deleteEvent: (parent, args) => {
      const eventIndex = events.findIndex((event) => event.id === args.id);

      if (eventIndex === -1) throw new Error("Event Not Found!");

      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);
      return deletedEvent;
    },
    deleteAllEvents: () => {
      const eventsCount = events.length;
      events.splice(0, eventsCount);
      return { count: eventsCount };
    },

    // Location
    createLocation: (parent, args) => {
      const location = {
        id: nanoid(),
        ...args.data,
      };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, args) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === args.id
      );

      if (locationIndex === -1) throw new Error("Location Not Found!");

      const updatedLocation = (locations[locationIndex] = {
        ...locations[locationIndex],
        ...args.data,
      });

      return updatedLocation;
    },
    deleteLocation: (parent, args) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === args.id
      );

      if (locationIndex === -1) throw new Error("Location Not Found!");

      const deletedLocation = locations[locationIndex];
      locations.splice(locationIndex, 1);

      return deletedLocation;
    },
    deleteAllLocations: () => {
      const locationsCount = locations.length;
      locations.splice(0, locationsCount);
      return { count: locationsCount };
    },

    // Participant
    createParticipant: (parent, args) => {
      const participant = {
        id: nanoid(),
        ...args.data,
      };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, args) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === args.id
      );

      if (participantIndex === -1) throw new Error("Participant Not Found!");

      const updatedParticipant = (participants[participantIndex] = {
        ...participants[participantIndex],
        ...args.data,
      });
      return updatedParticipant;
    },
    deleteParticipant: (parent, args) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === args.id
      );

      if (participantIndex === -1) throw new Error("Participant Not Found!");

      const deletedParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);

      return deletedParticipant;
    },
    deleteAllParticipants: () => {
      const participantsCount = participants.length;
      participants.splice(0, participantsCount);
      return { count: participantsCount };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`Apollo server is up at start ${url}`);
});
