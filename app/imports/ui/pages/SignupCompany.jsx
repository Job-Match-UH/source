import React from 'react';
import { Button, Form, Icon, Input, Placeholder, Tab } from 'semantic-ui-react';

const panes = [

  { menuItem: 'Company Description', render: () => <Tab.Pane>
    <Form>
      <Form.Input fluid label='Company Logo:'>
        <Placeholder style={{ height: 150, width: 150 }}>
          <Placeholder.Image/>
        </Placeholder>
      </Form.Input>
      <Button compact size='mini'>Select Photo</Button>
      <Form.Input fluid label='Company Name:' placeholder='Company' />
      <Form.Input fluid label='Website:' placeholder='Website URL' />
      <Form.TextArea label='Company Description:' placeholder='Tell us a little bit about the company...' />
      <Form.Button content='Submit' />
    </Form>
  </Tab.Pane> },

  { menuItem: 'Company Details', render: () => <Tab.Pane>
    <Form>
      <Form.Group unstackable widths={2}>
        <Form.Input fluid label='Address:' placeholder='Address'/>
        <Form.Input fluid label='State:' placeholder='State'/>
      </Form.Group>
      <Form.Group inline>
        <Form.Field>
          <label>Phone Number:</label>
          <Input placeholder='(xxx)' />
        </Form.Field>
        <Form.Field>
          <Input placeholder='xxx' />
        </Form.Field>
        <Form.Field>
          <Input placeholder='xxx' />
        </Form.Field>
      </Form.Group>
      <Form.Input fluid label='Number of employees:' />
      <Form.Input fluid label='Year Established:' />
      <Form.Button content='Submit' />
    </Form>
  </Tab.Pane> },

  { menuItem: 'Job Postings', render: () => <Tab.Pane>
    <Form>
      <Form.Input fluid label='Position:' placeholder='Position' />
      <Form.Input fluid label='Job ID:' placeholder='Job ID' />
      <Form.TextArea label='Job Description:' placeholder='Job Description' />
      <Form.TextArea label='Qualifications:' placeholder='Qualifications' />
      <Form.Button icon size='mini'>
        <Icon name='plus' />
        Add Another Job?
      </Form.Button>
      <Form.Button content='Submit' />
    </Form>
  </Tab.Pane>,
  },
];

const SignupCompany = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
);

export default SignupCompany;
