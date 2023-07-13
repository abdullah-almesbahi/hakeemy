import { getUserId, getAdminId } from '../../utils';
import { stringArg, idArg, queryType } from 'nexus';
import { prismaObjectType } from 'nexus-prisma';
import { UserConnection } from '../../types';
import { verify } from 'jsonwebtoken';

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields([
      'user',
      'users',
      'usersConnection',

      'appointments',

      'doctors',
      'specialities',
      'specialitiesConnection',
      'hospitals',

      'page',
      'pages',
      'pagesConnection',

      'blog',
      'blogs',
      'blogsConnection',

      'blogPost',
      'blogPosts',
      'blogPostsConnection',

      'postImage',
      'postImages',
      'postImagesConnection',

      'blogComment',
      'blogComments',
      'blogCommentsConnection'
    ]);

    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJiYXoiOiJib2IiLCJpc3MiOiJodHRwOi8vaGFrZWVteS50ZXN0L2FwaS9tYWlsL21hc3RlcnlvLnNhQGdtYWlsLmNvbSIsImlhdCI6MTU4NjgxNDAzMywiZXhwIjoxNTg3MTc0MDMzLCJuYmYiOjE1ODY4MTQwMzMsImp0aSI6Iktzc1dhUUFqOXlKejJsaTMifQ.Zti9Szwr-JfqljDTXw41S9F0SBodUpW4s9uKFRphBtg
        const userId = getUserId(ctx);
        return ctx.prisma.user({ id: userId });
      }
    });

    // TODO: remove connection when it fixed https://github.com/prisma/nexus-prisma/issues/12
    t.field('usersConnection', {
      ...t.prismaType.usersConnection,
      resolve(root, args, ctx) {
        return ctx.prisma.usersConnection()
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

    // end
  }
});
