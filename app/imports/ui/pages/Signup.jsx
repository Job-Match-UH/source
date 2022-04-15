import React from 'react';
import { Container, Form, Header, Tab } from 'semantic-ui-react';

class Signup extends React.Component {

  render() {
    const listYears = [];

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

    const panes = [
      {
        menuItem: 'Personal Info', render: () => <Tab.Pane>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='First name' placeholder='First name'/>
              <Form.Input fluid label='Last name' placeholder='Last name'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Address' placeholder='Address'/>
              <Form.Input fluid label='Phone Number' placeholder='(xxx) xxx - xxxx'/>
            </Form.Group>
            <Form.TextArea label='About' placeholder='Tell us more about you...'/>
            <Form.Input fluid label='Profile Picture' placeholder='Upload Image'/>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Tab.Pane>,
      },
      { menuItem: 'Interests', render: () => <Tab.Pane></Tab.Pane> },
      { menuItem: 'Projects', render: () => <Tab.Pane></Tab.Pane> },
      { menuItem: 'Experience', render: () => <Tab.Pane></Tab.Pane> },
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
          <Form.Button>Add Education</Form.Button>
        </Form>
      </Tab.Pane> },
      { menuItem: 'Documents', render: () => <Tab.Pane></Tab.Pane> },
    ];

    return (
      <div>
        <Container>
          <Header as='h1'>Create Student Profile</Header>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
        </Container>
      </div>
    );
  }
}

export default Signup;
