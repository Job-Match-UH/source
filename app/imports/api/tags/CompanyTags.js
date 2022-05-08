import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class CompanyTagsCollection {

  constructor() {
    // common interest data used between student and company
    const CommonInterestData = {
      interests: ['Accounting/Fiscal', 'Administrative/Clerical', 'Agriculture', 'Architecture', 'Aquaculture', 'Art', 'Automotive', 'Business', 'Child Car', 'Communication',
        'Computer', 'Construction Trades', 'Culinary Arts', 'Education', 'Electrical', 'Electronics', 'Emergency Medical Services', 'Engineering', 'Fashion Tech', 'Finance',
        'Food Service', 'Graphical Arts', 'Groundskeeping/Janitorial', 'Health/Medical', 'Human Resources', 'Human Services', 'Janitorial/Custodial', 'Journalism', 'Laborer',
        'Language', 'Law Enforcement/Judicial', 'Mail Processing', 'Marketing', 'Mathematics Statistics', 'Media', 'Miscellaneous', 'Performing Arts', 'Receptionist', 'Research',
        'Retail', 'Science', 'Social Services', 'Sports/Recreation', 'Student Activities', 'Sustainability', 'Switch Board Operator', 'Technical/Trades', 'Tourism/Hospitality', 'Tutoring'],
    };

    // The name of this collection.
    this.name = 'CompanyTagsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, optional: true, allowedValues: CommonInterestData.interests },
      owner: String,
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const CompanyTags = new CompanyTagsCollection();
