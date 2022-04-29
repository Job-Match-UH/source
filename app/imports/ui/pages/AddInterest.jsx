import React from 'react';
import { AutoForm, ErrorsField, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Tags } from '../../api/tags/Tags';

const bridge = new SimpleSchema2Bridge(Tags.schema);

/** Renders the Page for adding a document. */
class AddProject extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, owner } = data;
    Tags.collection.insert({ name, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Interests added!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;

    return (
      <AutoForm id='add-interest-page' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <MultiSelectField name='name' fluid="true" showInlineError={true} placeholder={'Select from list'}/>
        <SubmitField icon='plus' value='Add Interest'/>
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
