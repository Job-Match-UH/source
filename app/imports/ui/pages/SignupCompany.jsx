import React from 'react';
import { Button, Form, Placeholder, Tab } from 'semantic-ui-react';

const panes = [

  { menuItem: 'Page Preview', render: () => <Tab.Pane>Page Review Content</Tab.Pane> },

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
    </Form>
  </Tab.Pane> },

  { menuItem: 'Company Details', render: () => <Tab.Pane>
    <Form>
      <Form.Input fluid label='Address:' placeholder='Address' />
      <Form.Input fluid label='State:' placeholder='State' />
      <Form.Input fluid label='Phone Number:' placeholder='(xxx) xxx - xxxx' />
      <Form.Input fluid label='Number of employees:' />
      <Form.Input fluid label='Year Established:' />
    </Form>
  </Tab.Pane> },

  { menuItem: 'Job Postings', render: () => <Tab.Pane>Job Postings Content</Tab.Pane> },
];

const SignupCompany = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
);

export default SignupCompany;
