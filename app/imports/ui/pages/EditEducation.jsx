import React from 'react';
import { Container, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, DateField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Education } from '../../api/education/Education';

const bridge = new SimpleSchema2Bridge(Education.schema);

/** Renders the Page for editing a single document. */
class EditEducation extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { school, degree, field, startDate, endDate, _id } = data;
    Education.collection.update(_id, { $set: { school, degree, field, startDate, endDate, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Education updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const degreeTypes = ['High School Diploma', 'Associates', 'Bachelors', 'Masters'];

    return (
      <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
        <Container>
          <TextField id='education-title' fluid="true" name='school' label='School' placeholder='Ex. UH Manoa'/>
          <SelectField fluid="true" placeholder='High School Diploma' name='degree' allowedValues={degreeTypes}/>
          <TextField id='education-name' fluid="true" name='field' label='Field of study' placeholder='Ex. Computer Science'/>
          <DateField name='startDate' label='Start Date'/>
          <DateField name='endDate' label='End Date (or expected)'/>
          <SubmitField value='Edit Education'/>
          <HiddenField name='owner'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditEducation.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Education.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Education.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditEducation);
