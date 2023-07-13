import { prismaObjectType } from 'nexus-prisma';

export const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields(['*']);
  }
});

export const UserConnection = prismaObjectType({
  name: 'UserConnection',
  definition(t) {
    t.prismaFields(['*']);

    t.field('aggregate', {
      ...t.prismaType.aggregate,
      resolve(root, args, ctx) {
        return root.aggregate;
      }
    });
  }
});
