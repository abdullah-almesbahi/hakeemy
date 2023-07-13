import { stringArg, idArg, mutationType, intArg } from 'nexus';
import { prismaObjectType } from 'nexus-prisma';
import { APP_SECRET, ThrowJsonError } from '../../utils';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

export const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    // Common
    t.prismaFields([
      // 'createAdmin',
      // 'updateAdmin',
      'deleteAdmin',

      'createTranslation',
      'updateTranslation',
      'deleteTranslation',

      'createUser',
      'updateUser',

      'createPage',
      'updatePage'
    ]);

    t.field('createAdmin', {
      ...t.prismaType.createAdmin,
      // args: {
      //   first_name: stringArg({ nullable: true }),
      //   last_name: stringArg({ nullable: true }),
      //   email: stringArg(),
      //   password: stringArg(),
      //   role: stringArg()
      // },
      resolve: async (
        parent,
        { data: { first_name, last_name, email, password, role } },
        ctx
      ) => {
        const _admin = await ctx.prisma.admin({ email });

        if (_admin) {
          ThrowJsonError({
            email: `There is another admin with this email : ${email}`
          });
        }

        const hashedPassword = await hash(password, 10);

        return await ctx.prisma.createAdmin({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role
        });
      }
    });

    t.field('updateAdmin', {
      ...t.prismaType.updateAdmin,
      type: 'Admin',
      resolve: async (parent, args, ctx) => {
        const admin = await ctx.prisma.admin({ id: args.where.id });
        if (!admin) {
          throw new Error(`No admin found for id: ${args.where.id}`);
        }

        console.log('admin', admin.password);

        if (admin.password != args.data.password) {
          const hashedPassword = await hash(args.data.password, 10);
          return ctx.prisma.updateAdmin({
            data: {
              first_name: args.data.first_name,
              last_name: args.data.last_name,
              email: args.data.email,
              role: args.data.role,
              password: hashedPassword
            },
            where: {
              id: args.where.id
            }
          });
        } else {
          return ctx.prisma.updateAdmin({
            data: {
              first_name: args.data.first_name,
              last_name: args.data.last_name,
              email: args.data.email,
              role: args.data.role
            },
            where: {
              id: args.where.id
            }
          });
        }
      }
    });

    t.field('login', {
      type: 'AdminAuthPayload',
      args: {
        username: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { username, password }, ctx) => {
        const admin = await ctx.prisma.admin({ user: username });

        if (!admin) {
          throw new Error(`No admin found for : ${username}`);
        }
        // const passwordValid = await compare(password, admin.password);
        const passwordValid = password === admin.pass ? true : false;
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: admin.id }, APP_SECRET),
          admin
        };
      }
    });
  }
});
