import { objectType } from 'nexus';

export const AdminAuthPayload = objectType({
  name: 'AdminAuthPayload',
  definition(t) {
    t.string('token');
    t.field('admin', { type: 'Admin' });
  }
});
