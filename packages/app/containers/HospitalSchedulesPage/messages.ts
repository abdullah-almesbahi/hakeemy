/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HospitalDoctorsSchedulePage';

export default defineMessages({
  noScheduleExist: {
    id: `${scope}.noScheduleExist`,
    defaultMessage: 'no schedule exist'
  },
  schedules: {
    id: `${scope}.schedules`,
    defaultMessage: 'SCHEDULES'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'SAVE'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete'
  },
  confirmDeleteTitle: {
    id: `${scope}.confirmDeleteTitle`,
    defaultMessage: 'Confirm delete'
  },
  confirmDelete: {
    id: `${scope}.confirmDelete`,
    defaultMessage: 'Are you sure you want to delete?'
  }
});
