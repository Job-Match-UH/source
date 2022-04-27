import React from 'react';
import { Container, Header, Tab, Form } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
// import { Redirect } from 'react-router';
import { Students } from '../../api/student/Student';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';
import AddProject from './AddProject';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  phone: Number,
  about: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class SignupStudent extends React.Component {

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
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    /*
    if (this.state.redirectToReferer) {
      return <Redirect to={'/studentprofile'}/>;
    }

 */
    /*
    const interests = [
      {
        key: 'default',
        text: 'default',
        value: 'default',
      },
      {
        key: 'default2',
        text: 'default2',
        value: 'default2',
      },
      {
        key: 'default3',
        text: 'default3',
        value: 'default3',
      },
    ];
*/

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
      /* { menuItem: 'Interests', render: () => <Tab.Pane>
        <Form.Dropdown label='Add interests' placeholder='Pick multiple interests' fluid multiple selection options={interests} />
      </Tab.Pane> },
       */
      { menuItem: 'Projects', render: () => <Tab.Pane>
        <AddProject owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Experience', render: () => <Tab.Pane>
        <AddExperience owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Education', render: () => <Tab.Pane>
        <AddEducation owner={Meteor.user().username}/>
      </Tab.Pane> },
      /*
      { menuItem: 'Documents', render: () => <Tab.Pane>
        <Form>
          <Form.Input fluid label='Upload documents' placeholder='Upload file'>
            <Form.Button
              content="Choose File"
              labelPosition="left"
              icon="file"
              onClick={() => this.fileInputRef.current.click()}
            />
            <input
              ref={this.fileInputRef}
              type="file"
              hidden
              onChange={this.fileChange}
            />
          </Form.Input>
        </Form>
      </Tab.Pane> },
      */
    ];

    /*
    <Form.Input fluid label='Profile Picture' placeholder='Upload Image'>
            <Form.Button
              content="Choose File"
              labelPosition="left"
              icon="file"
              onClick={() => this.fileInputRef.current.click()}
            />
            <input
              ref={this.fileInputRef}
              type="file"
              hidden
              onChange={this.fileChange}
            />
          </Form.Input>
     */

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

export default SignupStudent;
