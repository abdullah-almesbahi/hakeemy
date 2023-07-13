import { getUserId, getAdminId } from '../../utils';
import { stringArg, idArg, queryType } from 'nexus';
import { prismaObjectType } from 'nexus-prisma';
import {
  UserConnection,
  ProductConnection,
  ProductCategoryConnection,
  ProductTagConnection,
  ProductImageConnection,
  ProductAttributeConnection,
  ProductAttributeTermConnection,
  // ProductVariationConnection,
  ProductReviewConnection,
  FavouriteConnection,
  OrderConnection,
  CartConnection,
  PageConnection
} from '../../types';

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'admin',
      'admins',
      'adminsConnection',

      'user',
      'users',
      'usersConnection',

      'translation',
      'translations',
      'translationsConnection',

      'page',
      'pages',
      'pagesConnection'
    ]);

    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getAdminId(ctx);
        return ctx.prisma.user({ id: userId });
      }
    });

    // TODO: remove connection when it fixed https://github.com/prisma/nexus-prisma/issues/12
    t.field('adminsConnection', {
      ...t.prismaType.adminsConnection,
      resolve(root, args, ctx) {
        return ctx.prisma.adminsConnection(args)
          .$fragment(`fragment _AdminConnection on AdminConnection {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          aggregate { count }
          edges {
            cursor
            node { id  }
          }
         }`);
      }
    });

    t.field('translationsConnection', {
      ...t.prismaType.translationsConnection,
      resolve(root, args, ctx) {
        return ctx.prisma.translationsConnection(args)
          .$fragment(`fragment _TranslationConnection on TranslationConnection {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          aggregate { count }
          edges {
            cursor
            node { id  }
          }
         }`);
      }
    });

    t.field('usersConnection', {
      ...t.prismaType.usersConnection,
      resolve(root, args, ctx) {
        return ctx.prisma.usersConnection(args)
          .$fragment(`fragment _UserConnection on UserConnection {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          aggregate { count }
          edges {
            cursor
            node { id  }
          }
         }`);
      }
    });

    t.field('pagesConnection', {
      ...t.prismaType.pagesConnection,
      resolve(root, args, ctx) {
        return ctx.prisma.pagesConnection(args)
          .$fragment(`fragment _PageConnection on PageConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      aggregate { count }
      edges {
        cursor
        node { id  }
      }
     }`);
      }
    });

    // end
  }
});
