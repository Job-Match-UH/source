import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  console.log(`  ${email} : ${role}`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'student') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'student');
  }
  if (role === 'company') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'company');
  }
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultUsers.map(({ email, password, role }) => createUser(email, password, role));
  }
}
