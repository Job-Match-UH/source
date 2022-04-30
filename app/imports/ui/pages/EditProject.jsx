import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Projects } from '../../api/projects/Projects';

const bridge = new SimpleSchema2Bridge(Projects.schema);

/** Renders the Page for editing a single document. */
class EditProject extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, description, _id } = data;
    Projects.collection.update(_id, { $set: { name, description, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Project updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {

    return (
      <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
        <Container>
          <TextField id='projects-name' fluid="true" name='name' label='Project Name' placeholder='Ex. Calculator' />
          <LongTextField id='projects-description' name='description' label='Project description' placeholder='What did you do in this project...' />
          <SubmitField icon='plus' value='Edit Project'/>
          <HiddenField name='owner'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProject.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Projects.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Projects.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditProject);
