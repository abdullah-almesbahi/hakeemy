// import { GraphQLServer } from 'graphql-yoga';
const { GraphQLServer } = require('graphql-yoga');
import { prisma } from '../generated/prisma-client';
import * as path from 'path';
import { makePrismaSchema } from 'nexus-prisma';
import * as allTypes from '../resolvers/frontend';
import { permissions as adminPermissions } from '../admin.permissions';
import * as adminAllTypes from '../resolvers/admin';
import datamodelInfo from '../generated/nexus-prisma';

const adminSchema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: adminAllTypes,

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, '../generated/admin-schema.graphql'),
    typegen: path.join(__dirname, '../generated/admin-nexus.ts')
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

const adminServer = new GraphQLServer({
  // middlewares: [adminPermissions as any],
  context: request => {
    return {
      ...request,
      prisma
    };
  },
  schema: adminSchema as any
});
const options = {
  port: 4001
};

adminServer.start(options, ({ port }) =>
  console.log(`Admin API ready at http://localhost:${port}`)
);

export default adminServer;
