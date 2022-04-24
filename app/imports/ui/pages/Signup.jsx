import React from 'react';
import { Container, Header, Tab, Form } from 'semantic-ui-react';
import { AutoForm, LongTextField, SubmitField, TextField, NumField, SelectField, DateField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Students } from '../../api/student/Student';
import { Experiences } from '../../api/experience/Experience';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  phone: Number,
  about: String,
  email: String,
  title: String,
  type: String,
  company: String,
  role: String,
  description: String,
  startMonth: String,
  startYear: Number,
  endYear: Number,
  endMonth: String,
  stateOfEmployment: Boolean,
  exp_start: Date,
  exp_end: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class Signup extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, about, phone, address, email, title, type, company, role, description, stateOfEmployment, exp_start, exp_end } = data;
    const owner = Meteor.user().username;
    Students.collection.insert({ firstName, lastName, about, phone, email, address },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
    Experiences.collection.insert({ title, type, company, role, description, stateOfEmployment, exp_start, exp_end },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;

    const employmentType = ['Full-time', 'Part-time', 'Internship', 'Seasonal', 'Self-employed'];

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
            <TextField fluid label='Email' placeholder='johnfoo@email.com' name='email'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <TextField fluid label='Address' placeholder='Address' name='address'/>
            <NumField fluid label='Phone Number' placeholder='(xxx) xxx - xxxx' name='phone'/>
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
        <Form.Group widths='equal'>
          <TextField fluid="true" label='Title' placeholder='Ex. Retail Manager' name='title'/>
          <SelectField fluid="true" placeholder='Ex. Full-time' name='type' allowedValues={employmentType}/>
        </Form.Group>
        <TextField fluid="true" label='Name of company' placeholder='Ex.  Walmart' name='company'/>
        <LongTextField label='Job description' placeholder='What were your responsibilities...' name='description'/>
        <DateField name='exp_start' label='Start Date'/>
        <DateField name='exp_start' label='End Date'/>
        <SubmitField icon='plus' value='Add Experience'/>
      </Tab.Pane> },
      /*

      <Form.Select
              label='Start year'
              options={listYears}
              placeholder='select year'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select
              label='End month (or expected)'
              options={months}
              placeholder='Select Month'
            />
            <Form.Select
              label='End year (or expected)'
              options={listYears}
              placeholder='select year'
            />
      { menuItem: 'Education', render: () => <Tab.Pane>
        <Form>
          <TextField fluid label='School' placeholder='Ex. UH Manoa'/>
          <TextField fluid label='Degree' placeholder='Ex. Bachelor&apos;s'/>
          <TextField fluid label='Field of study' placeholder='Ex. Computer Science'/>
          <Form.Group widths='equal'>
            <Form.Select
              label='Start month'
              options={startMonths}
              placeholder='Select Month'
            />
            <Form.Select
              label='Start year'
              options={listYears}
              placeholder='select year'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select
              label='End month (or expected)'
              options={startMonths}
              placeholder='Select Month'
            />
            <Form.Select
              label='End year (or expected)'
              options={listYears}
              placeholder='select year'
            />
          </Form.Group>
          <Form.Button><Icon name='plus' />Add education</Form.Button>
        </Form>
      </Tab.Pane> },
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

export default Signup;
