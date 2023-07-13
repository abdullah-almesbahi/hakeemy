import { rule, shield, allow, deny, and, or } from 'graphql-shield';
import { getAdminId } from './utils';

const rules = {
  isAuthenticatedAdmin: rule({ cache: 'contextual' })(
    (parent, args, context) => {
      const userId = getAdminId(context);
      return Boolean(userId);
    }
  )
};

export const permissions = shield(
  {
    Query: {
      // Common
      '*': deny,

      me: rules.isAuthenticatedAdmin,

      admin: rules.isAuthenticatedAdmin,
      admins: rules.isAuthenticatedAdmin,
      adminsConnection: rules.isAuthenticatedAdmin,

      translation: rules.isAuthenticatedAdmin,
      translations: rules.isAuthenticatedAdmin,
      translationsConnection: rules.isAuthenticatedAdmin,

      user: rules.isAuthenticatedAdmin,
      users: rules.isAuthenticatedAdmin,
      usersConnection: rules.isAuthenticatedAdmin,

      page: rules.isAuthenticatedAdmin,
      pages: rules.isAuthenticatedAdmin,
      pagesConnection: rules.isAuthenticatedAdmin
    },
    // create update updateMany upsert delete deleteMany
    Mutation: {
      // Common
      '*': deny,
      login: allow,
      // signup: allow,

      createAdmin: rules.isAuthenticatedAdmin,
      updateAdmin: rules.isAuthenticatedAdmin,
      deleteAdmin: rules.isAuthenticatedAdmin,

      createTranslation: rules.isAuthenticatedAdmin,
      updateTranslation: rules.isAuthenticatedAdmin,
      deleteTranslation: rules.isAuthenticatedAdmin,

      createUser: rules.isAuthenticatedAdmin,
      updateUser: rules.isAuthenticatedAdmin,

      createPage: rules.isAuthenticatedAdmin,
      updatePage: rules.isAuthenticatedAdmin
    }
  },
  {
    // debug: true
    // fallbackRule: deny,
  }
);
