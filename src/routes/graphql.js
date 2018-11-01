const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graph/queryDef')


const server = new ApolloServer({ typeDefs, resolvers });
const { path } = require('../config/system-config')
server.applyMiddleware({ app, path });

module.exports = app;