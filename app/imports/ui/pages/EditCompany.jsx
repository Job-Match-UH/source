import React from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField, NumField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';
import AddInterest from './AddInterest';

const bridge = new SimpleSchema2Bridge(Companies.schema);

/** Renders the Page for editing a single document. */
class EditCompany extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { companyName, website, description, address, state, phone, year, image, _id } = data;
    Companies.collection.update(_id, { $set: { companyName, website, description, address, state, phone, year, image, _id } }, (error) => (error ?
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
        <Container id='edit-company-page'>
          <TextField id='company-name' fluid label={'Company Name'} placeholder={'Ex: Company Connector'} name={'companyName'}/>
          <TextField id='company-image' fluid label={'Profile Photo'} placeholder={'Image URL'} name={'image'}/>
          <TextField id='company-website' fluid label={'Website'} placeholder={'Website URL'} name={'website'}/>
          <LongTextField label={'Company Description:'} placeholder={'Tell us a little bit about the company...'} name={'description'}/>
          <Form>
            <Form.Group unstackable widths={2}>
              <TextField id='company-address' fluid label='Address' placeholder='Address' name='address'/>
              <TextField id='company-state' fluid label='State' placeholder='Ex: HI' name='state'/>
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <NumField id='company-phone-num' placeholder='1234567890' name='phone'/>
              </Form.Field>
            </Form.Group>
            <NumField id='year-established' fluid label='Year Established' placeholder='Ex: 2000' name='year'/>
            <AddInterest owner={Meteor.user().username}/>
          </Form>
          <SubmitField value='Edit Company Information'/>
          <HiddenField name='owner'/>
          <ErrorsField/>
        </Container>
      </AutoForm>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditCompany.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Companies.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditCompany);
