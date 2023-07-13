import { inputObjectType } from 'nexus';

export const CustomUpdateUserInput = inputObjectType({
  name: 'CustomUpdateUserInput',
  definition(t) {
    t.string('first_name', { required: true });
    t.string('last_name', { required: true });
    t.string('email', { required: true });
  }
});

export const CustomChangeUserPasswordInput = inputObjectType({
  name: 'CustomChangeUserPasswordInput',
  definition(t) {
    t.string('current_password', { required: true });
    t.string('new_password', { required: true });
  }
});
