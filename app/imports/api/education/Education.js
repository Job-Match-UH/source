import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ExperienceCollection. It encapsulates state and variable values for stuff.
 */
class EducationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'EducationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      school: String,
      degree: {
        type: String,
        defaultValue: 'High School Diploma',
        allowedValues: ['High School Diploma', 'Associates', 'Bachelors', 'Masters'],
      },
      field: String,
      owner: String,
      startDate: { type: Date, defaultValue: new Date() },
      endDate: { type: Date, defaultValue: new Date() },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the EducationCollection.
 * @type {EducationCollection}
 */
export const Education = new EducationCollection();
