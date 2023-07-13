import { prismaObjectType } from 'nexus-prisma';

export const Translation = prismaObjectType({
  name: 'Translation',
  definition(t) {
    t.prismaFields(['*']);
  }
});

export const TranslationConnection = prismaObjectType({
  name: 'TranslationConnection',
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
