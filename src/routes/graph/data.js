const Posts = [
    {
        id: 1,
        title: 'post 1',
        contents: 'post 1 contents'
    },
    {
        id: 2,
        title: 'post 2',
        contents: 'post 2 contents'
    },
    {
        id: 3,
        title: 'post 3',
        contents: 'post 3 contents'
    },
    {
        id: 4,
        title: 'post 4',
        contents: 'post 4 contents'
    },
    {
        id: 5,
        title: 'post 5',
        contents: 'post 5 contents'
    }
];
const Writers = [
    {
        id: 1,
        name: 'Writer 1',
        posts: [1, 3]
    },
    {
        id: 2,
        name: 'Writer 2',
        posts: [2, 4, 5]
    }
];
module.exports.Posts = Posts;
module.exports.Writers = Writers;