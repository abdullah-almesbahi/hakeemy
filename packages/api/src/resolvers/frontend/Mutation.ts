import { stringArg, idArg, mutationType } from 'nexus';
import { prismaObjectType } from 'nexus-prisma';
import {
  APP_SECRET,
  getHospitalId,
  getPatientId,
  ThrowJsonError
} from '../../utils';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import {
  CustomUpdateUserInput,
  CustomChangeUserPasswordInput
} from './CustomUser';

export const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    // Common
    // t.prismaFields([
    //   // 'createUser',
    //   // 'updateUser',

    //   // 'createProduct',
    //   // 'updateProduct',

    //   // 'createProductCategory',
    //   // 'updateProductCategory',

    //   // 'createProductTag',
    //   // 'updateProductTag',

    //   // 'createProductImage',
    //   // 'updateProductImage',

    //   // 'createProductAttribute',
    //   // 'updateProductAttribute',

    //   // 'createProductAttributeTerm',
    //   // 'updateProductAttributeTerm',

    //   // 'createProductVariation',
    //   // 'updateProductVariation',

    //   // 'createProductReview',
    //   // 'updateProductReview',

    //   // 'createFavourite',
    //   // 'updateFavourite',

    //   // 'createOrder',
    //   // 'updateOrder',

    //   // 'createCart',
    //   // 'updateCart'
    // ]);

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        first_name: stringArg({ nullable: true }),
        last_name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (
        parent,
        { first_name, last_name, email, password },
        ctx
      ) => {
        const _user = await ctx.prisma.user({ email });

        if (_user) {
          ThrowJsonError({
            email: `There is another user with this email : ${email}`
          });
        }

        const hashedPassword = await hash(password, 10);
        const user = await ctx.prisma.createUser({
          first_name,
          last_name,
          email,
          password: hashedPassword
        });
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg()
      },
      resolve: async (parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user({ email });

        if (!user) {
          ThrowJsonError({ email: `No user found for email: ${email}` });
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          ThrowJsonError({ password: `Invalid Password` });
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field('deleteDoctor', {
      ...t.prismaType.deleteDoctor,
      resolve: async (parent, args, ctx) => {
        // make sure hospital is logged in
        const hospitalId = getHospitalId(ctx);
        // console.log('hospitalId', hospitalId);

        // make sure doctor is available
        const hospital = await ctx.prisma
          .doctor({ id: args.where.id })
          .hospital();
        // console.log('doctor', doctor);
        if (hospital.length == 0) {
          ThrowJsonError({
            not_found: `No hospital found`
          });
        }

        // console.log('doctor', doctor.id);
        // make sure current doctor belong to loogged hospital
        if (hospital[0].id != hospitalId) {
          ThrowJsonError({
            not_found: `Doctor is not registered under your hospital`
          });
        }

        return ctx.prisma.deleteDoctor({ id: args.where.id });
      }
    });

    t.field('changeHospitalPassowrd', {
      type: 'Hospital',
      args: {
        data: CustomChangeUserPasswordInput
      },
      resolve: async (parent, args, ctx) => {
        const userId = getHospitalId(ctx);

        const user = await ctx.prisma.hospital({ id: userId });

        if (!user) {
          ThrowJsonError({
            current_password: `No user found`
          });
        }

        if (user.password != args.data.current_password) {
          ThrowJsonError({
            current_password: `Invalid password`
          });
        }

        return ctx.prisma.updateHospital({
          data: {
            password: args.data.new_password
          },
          where: {
            id: userId
          }
        });
      }
    });
    t.field('changePatientPassowrd', {
      type: 'Patient',
      args: {
        data: CustomChangeUserPasswordInput
      },
      resolve: async (parent, args, ctx) => {
        const userId = getPatientId(ctx);

        const user = await ctx.prisma.patient({ id: userId });

        if (!user) {
          ThrowJsonError({
            current_password: `No user found`
          });
        }

        if (user.password != args.data.current_password) {
          ThrowJsonError({
            current_password: `Invalid password`
          });
        }

        return ctx.prisma.updatePatient({
          data: {
            password: args.data.new_password
          },
          where: {
            id: userId
          }
        });
      }
    });

    t.field('updateUser', {
      ...t.prismaType.updateUser,
      type: 'User',
      args: {
        data: CustomUpdateUserInput
      },
      resolve: async (parent, args, ctx) => {
        const userId = getUserId(ctx);

        const user = await ctx.prisma.user({ id: userId });

        if (!user) {
          ThrowJsonError({
            email: `No user found for email: ${args.data.email}`
          });
        }

        return ctx.prisma.updateUser({
          data: {
            first_name: args.data.first_name,
            last_name: args.data.last_name,
            email: args.data.email
          },
          where: {
            id: userId
          }
        });
      }
    });

    // end
  }
});
