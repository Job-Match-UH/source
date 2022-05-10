import React from 'react';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Projects } from '../../api/projects/Projects';

const bridge = new SimpleSchema2Bridge(Projects.schema);

/** Renders the Page for adding a document. */
class AddProject extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, description, owner } = data;
    Projects.collection.insert({ name, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Project added!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;

    return (
      <AutoForm id='add-project-page' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <TextField id='projects-name' fluid="true" name='name' label='Project Name' placeholder='Ex. Calculator' />
        <LongTextField id='projects-description' name='description' label='Project description' placeholder='What did you do in this project...' />
        <SubmitField id='submit-new-project' icon='plus' value='Add Project'/>
        <HiddenField name='owner' value={this.props.owner}/>
        <ErrorsField/>
      </AutoForm>
    );
  }
}

// <HiddenField name='contactId' value={this.props.contactId}/>

AddProject.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddProject;
