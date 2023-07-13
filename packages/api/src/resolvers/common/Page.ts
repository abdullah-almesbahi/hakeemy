import { prismaObjectType } from 'nexus-prisma';

export const Page = prismaObjectType({
  name: 'Page',
  definition(t) {
    t.prismaFields(['*']);
  }
});

export const PageConnection = prismaObjectType({
  name: 'PageConnection',
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
