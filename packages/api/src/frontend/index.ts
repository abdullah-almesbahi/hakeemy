const { GraphQLServer } = require('graphql-yoga');
import { prisma } from '../generated/prisma-client';
import * as path from 'path';
import { makePrismaSchema } from 'nexus-prisma';
import { permissions } from '../frontend.permissions';
import * as allTypes from '../resolvers/frontend';
import datamodelInfo from '../generated/nexus-prisma';

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: allTypes,

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts')
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false
  },

  // // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, '../types.ts'),
        alias: 'types'
      }
    ],
    contextType: 'types.Context'
    // skipTypes: ['Mutation', /(.*?)Connection/],
    // debug: true,
  }
});

const server = new GraphQLServer({
  //   middlewares: [permissions as any],
  context: request => {
    return {
      ...request,
      prisma
    };
  },
  schema: schema as any
});

server.start(() =>
  console.log(`🚀 Frontend API ready at http://localhost:4000`)
);

export default server;
