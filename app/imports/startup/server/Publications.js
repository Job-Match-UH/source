import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Class } from '../../api/class/Class';
import { Students } from '../../api/student/Student';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';

Meteor.publish(Class.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Class.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Students.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.collection.find({ owner: username });
  }
  return this.ready();
});

// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Companies.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Companies.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Class.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Class.collection.find();
  }
  return this.ready();
});

// Planning:roles publication
Meteor.publish(Students.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.collection.find();
  }
  return this.ready();
});

// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Companies.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Companies.collection.find();
  }
  return this.ready();
});

// If logged in as company or student, publish all tag documents to user
Meteor.publish(Tags.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin' || 'company' || 'student')) {
    return Tags.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
