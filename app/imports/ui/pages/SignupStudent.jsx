import React from 'react';
import { Container, Header, Tab, Form } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Students } from '../../api/student/Student';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';
import AddProject from './AddProject';
import AddInterest from './AddInterest';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  phone: { type: SimpleSchema.Integer, min: 0 }, // can also use String as type
  about: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class SignupStudent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, about, phone, address, image } = data;
    const owner = Meteor.user().username;
    Students.collection.insert({ firstName, lastName, about, phone, address, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile created!', 'success');
          this.setState({ error: '', redirectToReferer: true });
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    const panes = [
      {
        menuItem: 'Personal Info', render: () => <Tab.Pane>
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
        </Tab.Pane>,
      },

      { menuItem: 'Projects', render: () => <Tab.Pane>
        <AddProject owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Experience', render: () => <Tab.Pane>
        <AddExperience owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Education', render: () => <Tab.Pane>
        <AddEducation owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Interests', render: () => <Tab.Pane>
        <AddInterest owner={Meteor.user().username}/>
      </Tab.Pane> },
    ];

    return (
      <div>
        <Container id='sign-up-student-page'>
          <Header className='cp-text' as='h1'>Create Student Profile</Header>
          <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Tab id='goto-projects-tab' menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
            <SubmitField id='#personal-info-submit' value='Submit' />
          </AutoForm>
        </Container>
      </div>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
SignupStudent.propTypes = {
  location: PropTypes.object,
  student: PropTypes.object.isRequired,
};

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
})(SignupStudent);
