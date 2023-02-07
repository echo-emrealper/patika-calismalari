const posts = [
    { postID: 1, postTitle: 'Post Title 1', postBody: 'Post Body 1' },
    { postID: 2, postTitle: 'Post Title 2', postBody: 'Post Body 2' },
    { postID: 3, postTitle: 'Post Title 3', postBody: 'Post Body 3' },
    { postID: 4, postTitle: 'Post Title 4', postBody: 'Post Body 4' }
];

const listPost = (posts) => {
    posts.map(post => console.log(JSON.stringify(post)));
};

const addPost = (posts, newPost) => {
    const promise = new Promise((resolve, reject) => {
        posts.push(newPost);
        resolve(posts);
        reject('Post eklenirken hata oluştu.');
    });

    return promise;
}

const showPosts = async (posts, newPost) => {
    try {
        await addPost(posts, newPost);
        listPost(posts);
    } catch (err) {
        console.log(err);
    }

}

showPosts(posts, {postID: 5, postTitle: 'Post Title 5', postBody: 'Post Body 5'})