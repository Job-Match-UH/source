import React from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, DateField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Experiences } from '../../api/experience/Experience';
import Project from '../components/Project';

const bridge = new SimpleSchema2Bridge(Experiences.schema);

/** Renders the Page for editing a single document. */
class EditExperience extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { contactId, title, type, company, role, description, exp_start, exp_end, _id } = data;
    Project.collection.update(_id, { $set: { contactId, title, type, company, role, description, exp_start, exp_end, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Experience updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const employmentType = ['Full-time', 'Part-time', 'Internship', 'Seasonal', 'Self-employed'];

    return (
      <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
        <Container>
          <Form.Group widths='equal'>
            <TextField id='experience-title' fluid="true" label='Title' placeholder='Ex. Retail Manager' name='title'/>
            <SelectField fluid="true" placeholder='Full-time' name='type' allowedValues={employmentType}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <TextField id='experience-name' fluid="true" label='Name of company' placeholder='Ex.  Walmart' name='company'/>
            <TextField id='experience-role' fluid="true" label='Role' placeholder='Crew Member' name='role'/>
          </Form.Group>
          <LongTextField id='experience-about' label='Job description' placeholder='What were your responsibilities...' name='description'/>
          <DateField name='exp_start' label='Start Date'/>
          <DateField name='exp_end' label='End Date'/>
          <SubmitField icon='plus' value='Edit Experience'/>
          <HiddenField name='owner'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditExperience.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Experiences.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Experiences.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditExperience);
