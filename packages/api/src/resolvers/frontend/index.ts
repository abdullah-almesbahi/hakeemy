import { Query } from './Query';
import { Mutation } from './Mutation';
import { AuthPayload } from '../common/AuthPayload';

import { User, UserConnection } from '../common/User';

import { Page, PageConnection } from '../common/Page';
import {
  CustomUpdateUserInput,
  CustomChangeUserPasswordInput
} from './CustomUser';

export const resolvers = {
  Query,
  Mutation,
  AuthPayload,

  User,
  UserConnection,

  Page,
  PageConnection,

  // custom
  CustomUpdateUserInput,
  CustomChangeUserPasswordInput
};
