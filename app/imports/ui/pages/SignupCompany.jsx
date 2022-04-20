import React from 'react';
import { Button, Container, Form, Header, Icon, Input, Placeholder, Tab } from 'semantic-ui-react';

class SignupCompany extends React.Component {

  render() {
    const panes = [

      {
        menuItem: 'Company Description', render: () => <Tab.Pane>
          <Form className='cp-text'>
            <Form.Input fluid label='Company Logo:'>
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image/>
              </Placeholder>
            </Form.Input>
            <Button compact size='mini'>Select Photo</Button>
            <Form.Input fluid label='Company Name:' placeholder='Ex: Company Connector'/>
            <Form.Input fluid label='Website:' placeholder='Website URL'/>
            <Form.TextArea label='Company Description:' placeholder='Tell us a little bit about the company...'/>
            <Form.Button content='Submit'/>
          </Form>
        </Tab.Pane>,
      },

      {
        menuItem: 'Company Details', render: () => <Tab.Pane>
          <Form>
            <Form.Group unstackable widths={2}>
              <Form.Input fluid label='Address:' placeholder='Address'/>
              <Form.Input fluid label='State:' placeholder='Ex: HI'/>
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <label>Phone Number:</label>
                <Input placeholder='(xxx)'/>
              </Form.Field>
              <Form.Field>
                <Input placeholder='xxx'/>
              </Form.Field>
              <Form.Field>
                <Input placeholder='xxx'/>
              </Form.Field>
            </Form.Group>
            <Form.Input fluid label='Year Established:' placeholder='Ex: 2000'/>
            <Form.Button content='Submit'/>
          </Form>
        </Tab.Pane>,
      },

      {
        menuItem: 'Job Postings', render: () => <Tab.Pane>
          <Form>
            <Form.Input fluid label='Job Title:' placeholder='Job Title'/>
            <Form.Input fluid label='Job ID:' placeholder='Job ID'/>
            <Form.Input fluid label='Pay:' placeholder='Estimated salary'/>
            <Form.Input fluid label='Location:' placeholder='Location'/>
            <Form.TextArea label='Job Description:' placeholder='Give a small description about the job position...'/>
            <Form.TextArea label='Qualifications:' placeholder='List the desired interests for this position...'/>
            <Form.Button icon size='mini'>
              <Icon name='plus'/>
              Add Another Job?
            </Form.Button>
            <Form.Button content='Submit'/>
          </Form>
        </Tab.Pane>,
      },
    ];

    return (
      <div>
        <Container>
          <Header className='cp-text' as='h1'>Create Company Profile</Header>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
        </Container>
      </div>
    );
  }
}

export default SignupCompany;
