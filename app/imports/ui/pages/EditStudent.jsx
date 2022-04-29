import React from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, NumField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Students } from '../../api/student/Student';

const bridge = new SimpleSchema2Bridge(Students.schema);

/** Renders the Page for editing a single document. */
class EditStudent extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, about, phone, address, image, _id } = data;
    Students.collection.update(_id, { $set: { firstName, lastName, about, phone, address, image, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Information updated successfully', 'success')));
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
          <Form.Group widths='equal'>
            <TextField id='personal-info-first-name' fluid label='First name' placeholder='First name' name='firstName'/>
            <TextField id='personal-info-last-name' fluid label='Last name' placeholder='Last name' name='lastName'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <TextField id='personal-info-address' fluid label='Address' placeholder='Address' name='address'/>
            <NumField id='personal-info-phone-num' fluid label='Phone Number' placeholder='1234567890' name='phone'/>
          </Form.Group>
          <TextField id='personal-info-image' fluid label='Profile Photo' placeholder='Image URL' name='image'/>
          <LongTextField id='personal-info-about' label='About' placeholder='Tell us more about you...' name='about'/>
          <SubmitField value='Edit Personal Information'/>
          <HiddenField name='owner'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStudent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Students.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Students.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditStudent);
