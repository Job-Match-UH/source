import React from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Jobs } from '../../api/job/Jobs';

const bridge = new SimpleSchema2Bridge(Jobs.schema);

/** Renders the Page for editing a single document. */
class EditJob extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { jobTitle, jobID, pay, location, jobDescription, qualifications, payType, _id } = data;
    Jobs.collection.update(_id, { $set: { jobTitle, jobID, pay, location, jobDescription, qualifications, payType, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Job updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const payTypes = ['hourly', 'annually'];

    return (
      <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
        <Container>
          <TextField fluid label='Job Title:' placeholder='Software Development Intern' name='jobTitle'/>
          <TextField fluid label='Job ID:' placeholder='1234567' name='jobID'/>
          <Form.Group widths='equal'>
            <NumField fluid="true" label='Pay:' placeholder='25' name='pay'/>
            <SelectField fluid="true" placeholder='hourly' name='payType' allowedValues={payTypes}/>
          </Form.Group>
          <TextField fluid label='Location:' placeholder='Ex. Honolulu, HI' name='location'/>
          <LongTextField label='Job Description:' placeholder='Give a small description about the job position...' name='jobDescription'/>
          <LongTextField label='Qualifications:' placeholder='List the desired interests for this position...' name='qualifications'/>
          <SubmitField value='Edit Job'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditJob.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Jobs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Jobs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditJob);
