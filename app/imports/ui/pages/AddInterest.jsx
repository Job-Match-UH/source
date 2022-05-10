import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { CompanyTags } from '../../api/tags/CompanyTags';
import { StudentTags } from '../../api/tags/StudentTags';

const CommonInterestData = ['Accounting/Fiscal', 'Administrative/Clerical', 'Agriculture', 'Architecture', 'Aquaculture', 'Art', 'Automotive', 'Business', 'Child Care', 'Communication',
  'Computer', 'Construction Trades', 'Culinary Arts', 'Education', 'Electrical', 'Electronics', 'Emergency Medical Services', 'Engineering', 'Fashion Tech', 'Finance',
  'Food Service', 'Graphical Arts', 'Groundskeeping/Janitorial', 'Hawaiian Studies', 'Health/Medical', 'Human Resources', 'Human Services', 'Janitorial/Custodial', 'Journalism', 'Laborer',
  'Language', 'Law Enforcement/Judicial', 'Mail Processing', 'Marketing', 'Mathematics Statistics', 'Media', 'Miscellaneous', 'Performing Arts', 'Receptionist', 'Research',
  'Retail', 'Science', 'Social Services', 'Sports/Recreation', 'Student Activities', 'Sustainability', 'Switch Board Operator', 'Technical/Trades', 'Tourism/Hospitality', 'Tutoring'];

/** Renders the Page for adding a document. */
class AddInterest extends React.Component {

  constructor() {
    super();
    this.tempSchema = new SimpleSchema({
      name: { type: Array, label: 'Interests', optional: true },
      'name.$': { type: String, allowedValues: CommonInterestData },
      owner: String,
    });
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, owner } = data;
    if (Roles.userIsInRole(Meteor.userId(), 'company')) {
      name.map((tag) => CompanyTags.collection.insert({ name: tag, owner: owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Interests added!', 'success');
            formRef.reset();
          }
        }));
    }

    if (Roles.userIsInRole(Meteor.userId(), 'student')) {
      name.map((tag) => StudentTags.collection.insert({ name: tag, owner: owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Interests added!', 'success');
            formRef.reset();
          }
        }));
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const bridge = new SimpleSchema2Bridge(this.tempSchema);

    return (
      <AutoForm style={ { marginBottom: 10 } } id='add-interest-page' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <MultiSelectField name='name' label='Interests' fluid="true" showInlineError={true} placeholder={'Select interests'}/>
        <SubmitField id='add-new-interest' icon='plus' value='Add Interest'/>
        <HiddenField name='owner' value={this.props.owner}/>
        <ErrorsField/>
      </AutoForm>
    );
  }
}

AddInterest.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddInterest;
