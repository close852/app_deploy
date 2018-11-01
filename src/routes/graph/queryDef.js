const { Writers, Posts } = require('./data')
const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Post{
        id: ID!,
        title: String,
        contents: String
    }
    type Writer{
        id: ID!
        name: String,
        posts: [Post]
    }
    type Query{
        Posts: [Post],
        Post(id: ID): Post,
        Writers: [Writer],
        Writer(id: ID):Writer
    }
    type App{
        appid : ID!,
        title : String,
        contents : String
    }
    
    type Mutation{
        writePost(writeId: ID, title: String, contents: String ):Post
    }
`;
const resolvers = {
    Query: {
        Posts: () => Posts,
        Post: (_, { id }) => Posts.find(o => String(o.id) === id),
        Writers: () => Writers,
        Writer: (_, { id }) => Writers.find(o => String(o.id) === id)
    },
    Writer: {
        id: w => w.id,
        name: w => w.name,
        posts: w => Posts.filter(post => w.posts.includes(post.id))
    },
    Post: {
        id: p => p.id,
        title: p => p.title
    },
    Mutation: {
        writePost: (_, { writeId, title, contents }) => {
            const id = Posts.length + 1;
            const post = {
                id,
                title,
                contents,
            };
            Posts.push(post);
            Writers.find(w => String(w.id) === writeId).posts.push(id);
            return post;
        }
    },
};
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}