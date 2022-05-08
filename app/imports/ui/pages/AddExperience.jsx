import React from 'react';
import { Form } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Experiences } from '../../api/experience/Experience';

const bridge = new SimpleSchema2Bridge(Experiences.schema);

/** Renders the Page for adding a document. */
class AddExperience extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { contactId, title, type, company, role, description, exp_start, exp_end, owner } = data;
    Experiences.collection.insert({ contactId, title, type, company, role, description, exp_start, exp_end, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Job Experience added!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const employmentType = ['Full-time', 'Part-time', 'Internship', 'Seasonal', 'Self-employed'];

    return (
      <AutoForm style={ { marginBottom: 10 } } ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Form.Group>
          <TextField id='experience-title' fluid="true" label='Title' placeholder='Ex. Retail Manager' name='title'/>
          <SelectField inline fluid="true" placeholder='Full-time' name='type' allowedValues={employmentType}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <TextField id='experience-name' fluid="true" label='Name of company' placeholder='Ex.  Walmart' name='company'/>
          <TextField id='experience-role' fluid="true" label='Role' placeholder='Crew Member' name='role'/>
        </Form.Group>
        <LongTextField id='experience-about' label='Job description' placeholder='What were your responsibilities...' name='description'/>
        <DateField name='exp_start' label='Start Date'/>
        <DateField name='exp_end' label='End Date'/>
        <SubmitField icon='plus' value='Add Experience'/>
        <HiddenField name='owner' value={this.props.owner}/>
        <ErrorsField/>
      </AutoForm>
    );
  }
}

// <HiddenField name='contactId' value={this.props.contactId}/>

AddExperience.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddExperience;
