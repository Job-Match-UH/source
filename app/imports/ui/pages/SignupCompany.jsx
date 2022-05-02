import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// import { Redirect } from 'react-router-dom';
import { Container, Form, Header, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Companies } from '../../api/company/Companies';
import AddInterest from './AddInterest';

const companySchema = new SimpleSchema({
  companyName: String,
  website: String,
  description: { type: String, optional: true, defaultValue: '' },
  address: String,
  state: String,
  phone: { type: SimpleSchema.Integer, min: 0 }, // can also use String as type
  year: { type: SimpleSchema.Integer, min: 0 },
  image: String,
});

const companyBridge = new SimpleSchema2Bridge(companySchema);

/* Renders the Page for adding a company. */
class SignupCompany extends React.Component {
  // On submit, insert data.
  submit(data, formRef) {
    const { companyName, website, description, address, state, phone, year, image } = data;
    const owner = Meteor.user().username;
    Companies.collection.insert({ companyName, website, description, address, state, phone, year, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Info added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <Container id='company-signup-page'>
        <Header className='cp-text' as='h1' textAlign='center'>Create Company Profile</Header>
        <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={companyBridge} onSubmit={data => this.submit(data, fRef)}>
          <Segment>
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
          </Segment>
          <SubmitField id='submit-company' value='Submit Profile'/>
        </AutoForm>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
SignupCompany.propTypes = {
  location: PropTypes.object,
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
})(SignupCompany);
