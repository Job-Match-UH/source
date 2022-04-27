import React from 'react';
import { AutoForm, DateField, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Education } from '../../api/education/Education';

const bridge = new SimpleSchema2Bridge(Education.schema);

/** Renders the Page for adding a document. */
class AddEducation extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { school, degree, field, startDate, endDate, owner } = data;
    Education.collection.insert({ school, degree, field, startDate, endDate, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Education added!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const degreeTypes = ['High School Diploma', 'Associates', 'Bachelors', 'Masters'];

    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <TextField id='education-title' fluid="true" name='school' label='School' placeholder='Ex. UH Manoa'/>
        <SelectField fluid="true" placeholder='High School Diploma' name='degree' allowedValues={degreeTypes}/>
        <TextField id='education-name' fluid="true" name='field' label='Field of study' placeholder='Ex. Computer Science'/>
        <DateField name='startDate' label='Start Date'/>
        <DateField name='endDate' label='End Date (or expected)'/>
        <SubmitField value='Add Education'/>
        <HiddenField name='owner' value={this.props.owner}/>
        <ErrorsField/>
      </AutoForm>
    );
  }
}

// <HiddenField name='contactId' value={this.props.contactId}/>

AddEducation.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddEducation;
