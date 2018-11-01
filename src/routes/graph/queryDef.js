const { Users, Apps, AppLines } = require('./data')
const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type User{
        userid: ID!
        username: String
    }
    type App{
        appid: ID!
        username: String
        applines: [AppLine]
    }
    type AppLine{
        applineid: ID!
        appid: String
        username: String
    }
    type Query{
        Users: [User]
        User(userid:ID): User
        App(appid:ID): App
        Apps: [App]
        AppLine(appid:String):[AppLine]
        AppLineByOne(applineid:ID):AppLine
        AppLines:[AppLine]
    }
    `;

// type Mutation{
//     writePost(writeId: ID, title: String, contents: String ):Post
// }
const resolvers = {
    Query: {
        Users: () => Users,
        User: (_, { userid }) => Users.find(o => String(o.userid) === userid),
        App: (_, { appid }) => Apps.find(app => String(app.appid) === appid),
        Apps: () => Apps, //.find(app => String(app.appid) === appid)
        AppLine: (_, { appid }) => AppLines.filter(app => String(app.appid) === appid),
        AppLineByOne: (_, { applineid }) => AppLines.find(line => line.applineid === applineid),
        AppLines: () => AppLines,

    },
    User: {//id(type User) : p(Users의 obj)
        userid: p => p.userid,
        username: p => p.username,
    },
    App: {
        appid: a => a.appid,
        username: a => a.username,
        applines: a => AppLines.filter(line => line.appid === a.appid)
        // applines: a => AppLines.filter(line => a.applines.appid === line.appid)
    },
    AppLine: {
        applineid: line => line.applineid,
        appid: line => line.appid,
        username: line => line.username
    }
    // Mutation: {
    //     writePost: (_, { writeId, title, contents }) => {
    //         const id = Posts.length + 1;
    //         const post = {
    //             id,
    //             title,
    //             contents,
    //         };
    //         Posts.push(post);
    //         Writers.find(w => String(w.id) === writeId).posts.push(id);
    //         return post;
    //     }
    // },
};
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}