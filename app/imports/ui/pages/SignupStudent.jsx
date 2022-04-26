import React from 'react';
import { Container, Header, Tab, Form } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router';
import { Students } from '../../api/student/Student';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  phone: Number,
  about: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class SignupStudent extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, about, phone, address } = data;
    const owner = Meteor.user().username;
    Students.collection.insert({ firstName, lastName, about, phone, address, owner },
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

    if (this.state.redirectToReferer) {
      return <Redirect to={'/studentprofile'}/>;
    }
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
            <TextField fluid label='First name' placeholder='First name' name='firstName'/>
            <TextField fluid label='Last name' placeholder='Last name' name='lastName'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <TextField fluid label='Address' placeholder='Address' name='address'/>
            <NumField fluid label='Phone Number' placeholder='1234567890' name='phone'/>
          </Form.Group>
          <LongTextField label='About' placeholder='Tell us more about you...' name='about'/>
        </Tab.Pane>,
      },
      /* { menuItem: 'Interests', render: () => <Tab.Pane>
        <Form.Dropdown label='Add interests' placeholder='Pick multiple interests' fluid multiple selection options={interests} />
      </Tab.Pane> },
      { menuItem: 'Projects', render: () => <Tab.Pane>
        <Form>
          <TextField fluid label='Name of project' placeholder='Ex. Company Connector'/>
          <LongTextField label='Summary' placeholder='Briefly summarize your project'/>
          <Form.Button><Icon name='plus' />Add project</Form.Button>
        </Form>
      </Tab.Pane> },
      */
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
        <Container>
          <Header className='cp-text' as='h1'>Create Student Profile</Header>
          <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
            <SubmitField value='Submit' />
          </AutoForm>
        </Container>
      </div>
    );
  }
}

export default SignupStudent;
