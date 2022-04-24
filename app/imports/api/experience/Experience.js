import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ExperienceCollection. It encapsulates state and variable values for stuff.
 */
class ExperienceCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ExperienceCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      title: String,
      type: {
        type: String,
        defaultValue: 'Full-time',
        allowedValues: ['Full-time', 'Part-time', 'Internship', 'Seasonal', 'Self-employed'],
      },
      company: String,
      role: String,
      description: String,
      stateOfEmployment: Boolean,
      exp_start: { type: Date, defaultValue: new Date() },
      exp_end: { type: Date, defaultValue: new Date() },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StudentCollection.
 * @type {StudentCollection}
 */
export const Experiences = new ExperienceCollection();
