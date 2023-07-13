import { prismaObjectType } from 'nexus-prisma';

export const Admin = prismaObjectType({
  name: 'Admin',
  definition(t) {
    t.prismaFields(['*']);
  }
});

export const AdminConnection = prismaObjectType({
  name: 'AdminConnection',
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
