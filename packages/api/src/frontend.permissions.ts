import { rule, shield, allow, deny, and, or } from 'graphql-shield';
import { getUserId, getPatientId, getHospitalId } from './utils';

const rules = {
  isAuthenticatedHospital: rule({ cache: 'contextual' })(
    (parent, args, context) => {
      const userId = getHospitalId(context);
      return Boolean(userId);
    }
  ),
  isAuthenticatedPatient: rule({ cache: 'contextual' })(
    (parent, args, context) => {
      const userId = getPatientId(context);
      return Boolean(userId);
    }
  ),
  isAuthenticatedUser: rule({ cache: 'contextual' })(
    (parent, args, context) => {
      const userId = getUserId(context);
      return Boolean(userId);
    }
  )
};

export const permissions = shield(
  {
    Query: {
      // Common
      '*': deny,

      // Frontend
      me: rules.isAuthenticatedUser,

      doctors: allow,
      specialities: allow,
      hospitals: allow,

      appointments: allow,

      page: allow,
      pages: allow,
      pagesConnection: allow,

      blog: allow,
      blogs: allow,
      blogsConnection: allow,

      blogPost: allow,
      blogPosts: allow,
      blogPostsConnection: allow,

      postImage: allow,
      postImages: allow,
      postImagesConnection: allow,

      blogComment: allow,
      blogComments: allow,
      blogCommentsConnection: allow
    },
    // create update updateMany upsert delete deleteMany
    Mutation: {
      // Common
      '*': deny,

      // Frontend
      login: allow,
      signup: allow,

      // hospital
      deleteDoctor: rules.isAuthenticatedHospital,

      updateUser: rules.isAuthenticatedUser,
      changeHospitalPassowrd: rules.isAuthenticatedHospital,
      changePatientPassowrd: rules.isAuthenticatedPatient
    }
  },
  {
    // debug: true
    // fallbackRule: deny,
  }
);
