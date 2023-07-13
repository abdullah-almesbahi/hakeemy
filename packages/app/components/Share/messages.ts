/*
 * InvitePage Messages
 *
 * This contains all the text for the InvitePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InvitePage';

export default defineMessages({
  invitation: {
    id: `${scope}.invitation`,
    defaultMessage: 'INVITATION'
  },
  shareTitle: {
    id: `${scope}.shareTitle`,
    defaultMessage:
      'Hi, i am using telmeeth, If you are a teacher, sign up using https://telmeeth-app.firebaseapp.com/invite/teacher/{invitation_code}, if you are a student sign up using https://telmeeth-app.firebaseapp.com/invite/student/{invitation_code}'
  },
  earnCredit: {
    id: `${scope}.earnCredit`,
    defaultMessage:
      'Earn SR 300 Credits for 30 lessons of invited teachers/students or Combining 30 lessons from different invited teachers/students'
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'SR'
  },
  yourCredit: {
    id: `${scope}.yourCredit`,
    defaultMessage: 'Your credit of invitations'
  },
  studentsHours: {
    id: `${scope}.studentsHours`,
    defaultMessage: 'No of Students Hours'
  },
  teacherHours: {
    id: `${scope}.teacherHours`,
    defaultMessage: 'No of Teacher Hours'
  },
  creditEarned: {
    id: `${scope}.creditEarned`,
    defaultMessage: 'Credit Earned'
  },
  creditSpent: {
    id: `${scope}.creditSpent`,
    defaultMessage: 'Credit Spent'
  },
  creditBalance: {
    id: `${scope}.creditBalance`,
    defaultMessage: 'Credit Balance'
  },
  shareCode: {
    id: `${scope}.shareCode`,
    defaultMessage: 'Share Code'
  }
});
