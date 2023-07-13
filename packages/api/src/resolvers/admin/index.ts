import { Query } from './Query';
import { Mutation } from './Mutation';
import { AdminAuthPayload } from '../common/AdminAuthPayload';

import { User, UserConnection } from '../common/User';
import { Admin, AdminConnection } from '../common/Admin';
import { Translation, TranslationConnection } from '../common/Translation';

import { Page, PageConnection } from '../common/Page';

export const resolvers = {
  Query,
  Mutation,
  AdminAuthPayload,

  Admin,
  AdminConnection,

  Translation,
  TranslationConnection,

  User,
  UserConnection,

  Page,
  PageConnection
};
