import React from 'react';
import { Container, Form, Header, Tab, Icon, Button } from 'semantic-ui-react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { SubmitField } from 'uniforms-semantic';
import { Students } from '../../api/student/Student';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  phone: Number,
  about: String,
  email: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class Signup extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, about, phone, address, email } = data;
    Students.collection.insert({ firstName, lastName, about, phone, email, address },
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
    const listYears = [];
    let fRef = null;
    let currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;

    while (currentYear >= startYear) {
      listYears.push(
        {
          key: currentYear,
          text: currentYear,
          value: currentYear,
        },
      );
      currentYear--;
    }

    const startMonths = [
      {
        key: 'January',
        text: 'January',
        value: 'January',
      },
      {
        key: 'February',
        text: 'February',
        value: 'February',
      },
      {
        key: 'March',
        text: 'March',
        value: 'March',
      },
      {
        key: 'April',
        text: 'April',
        value: 'April',
      },
      {
        key: 'May',
        text: 'May',
        value: 'May',
      },
      {
        key: 'June',
        text: 'June',
        value: 'June',
      },
      {
        key: 'July',
        text: 'July',
        value: 'July',
      },
      {
        key: 'August',
        text: 'August',
        value: 'August',
      },
      {
        key: 'September',
        text: 'September',
        value: 'September',
      },
      {
        key: 'October',
        text: 'October',
        value: 'October',
      },
      {
        key: 'November',
        text: 'November',
        value: 'November',
      },
      {
        key: 'December',
        text: 'December',
        value: 'December',
      },
    ];

    const employmentType = [
      {
        key: 'Full-time',
        text: 'Full-time',
        value: 'Full-time',
      },
      {
        key: 'Part-time',
        text: 'Part-time',
        value: 'Part-time',
      },
      {
        key: 'Self-employed',
        text: 'Self-employed',
        value: 'Self-employed',
      },
      {
        key: 'Seasonal',
        text: 'Seasonal',
        value: 'Seasonal',
      },
      {
        key: 'Internship',
        text: 'Internship',
        value: 'Internship',
      },
    ];

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

    const panes = [
      {
        menuItem: 'Personal Info', render: () => <Tab.Pane>
          <Form className='cp-text'>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First name' placeholder='First name'/>
              <Form.Input fluid label='Last name' placeholder='Last name'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Address' placeholder='Address'/>
              <Form.Input fluid label='Phone Number' placeholder='(xxx) xxx - xxxx'/>
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...'/>
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
            <SubmitField value='Submit'/>
          </Form>
        </Tab.Pane>,
      },
      { menuItem: 'Interests', render: () => <Tab.Pane>
        <Form.Dropdown label='Add interests' placeholder='Pick multiple interests' fluid multiple selection options={interests} />
      </Tab.Pane> },
      { menuItem: 'Projects', render: () => <Tab.Pane>
        <Form>
          <Form.Input fluid label='Name of project' placeholder='Ex. Company Connector'/>
          <Form.TextArea label='Summary' placeholder='Briefly summarize your project'/>
          <Form.Button><Icon name='plus' />Add project</Form.Button>
        </Form>
      </Tab.Pane> },
      { menuItem: 'Experience', render: () => <Tab.Pane>
        <Form>
          <Form.Input fluid label='Title' placeholder='Ex. Retail Manager'/>
          <Form.Select
            fluid label='Employment type'
            options={employmentType}
            placeholder='Select Type'
          />
          <Form.Input fluid label='Name of company' placeholder='Ex.  Walmart'/>
          <Form.TextArea label='Job description' placeholder='What were your responsibilities...'/>
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
          <Form.Button><Icon name='plus' />Add experience</Form.Button>
        </Form>
      </Tab.Pane> },
      { menuItem: 'Education', render: () => <Tab.Pane>
        <Form>
          <Form.Input fluid label='School' placeholder='Ex. UH Manoa'/>
          <Form.Input fluid label='Degree' placeholder='Ex. Bachelor&apos;s'/>
          <Form.Input fluid label='Field of study' placeholder='Ex. Computer Science'/>
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
    ];

    return (
      <div>
        <Container>
          <Header className='cp-text' as='h1'>Create Student Profile</Header>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
          <Button ref={ref => { fRef = ref; }} schema={bridge} onClick={data => this.submit(data, fRef)}>Submit</Button>
        </Container>
      </div>
    );
  }
}

export default Signup;
