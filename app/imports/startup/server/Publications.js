import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Class } from '../../api/class/Class';
import { Students } from '../../api/student/Student';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';
import { Jobs } from '../../api/job/Jobs';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';
import { Projects } from '../../api/projects/Projects';

Meteor.publish(Class.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Class.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Students.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return Students.collection.find();
  }
  return this.ready();
});

// If logged in user is a company, then publish only data for the company user
// If logged in user is a student, publish all companies in collection
Meteor.publish(Companies.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Companies.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return Companies.collection.find();
  }
  return this.ready();
});

Meteor.publish(Experiences.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Experiences.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return Experiences.collection.find();
  }
  return this.ready();
});

Meteor.publish(Projects.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Projects.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return Projects.collection.find();
  }
  return this.ready();
});

Meteor.publish(Education.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Education.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return Education.collection.find();
  }
  return this.ready();
});

Meteor.publish(Jobs.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Jobs.collection.find({ owner: username });
  }
  if (this.userId && Roles.userIsInRole(this.userId, 'student')) {
    return Jobs.collection.find();
  }
  return this.ready();
});

// If logged in as company or student, publish all tag documents to user
Meteor.publish(Tags.userPublicationName, function () {
  if (this.userId) {
    return Tags.collection.find();
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

Meteor.publish(Students.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.collection.find();
  }
  return this.ready();
});

Meteor.publish(Companies.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Companies.collection.find();
  }
  return this.ready();
});

Meteor.publish(Jobs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Jobs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Education.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Education.collection.find();
  }
  return this.ready();
});

Meteor.publish(Projects.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Projects.collection.find();
  }
  return this.ready();
});

Meteor.publish(Experiences.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Experiences.collection.find();
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
