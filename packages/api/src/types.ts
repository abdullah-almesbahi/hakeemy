import {
  UserConnection as PrismaUserConnection,
  AggregateUser,
  Prisma
} from './generated/prisma-client';

export type UserConnection = PrismaUserConnection & {
  aggregate: AggregateUser;
};

export interface Context {
  prisma: Prisma;
  request: any;
}
