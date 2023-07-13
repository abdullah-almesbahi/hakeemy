/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HospitalDoctorsPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  doctors: {
    id: `${scope}.doctors`,
    defaultMessage: 'DOCTORS'
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
  noDoctorsExist: {
    id: `${scope}.noDoctorsExist`,
    defaultMessage: 'No doctors exist'
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
  },
  successfullyDeletedDoctor: {
    id: `${scope}.successfullyDeletedDoctor`,
    defaultMessage: 'Successfully Deleted Doctor'
  }
});
