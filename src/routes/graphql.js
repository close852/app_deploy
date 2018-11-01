const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graph/queryDef')


const server = new ApolloServer({ typeDefs, resolvers });
const path = '/graphql';
server.applyMiddleware({ app, path });

// app.listen({ port: 7777 }, () => {
//     console.log(`Server ready at http://localhost:7777${server.graphqlPath}`)
// });


module.exports = app;