import React from 'react';
import { Button, Container, Form, Header, Icon, Input, Placeholder, Tab } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Companies } from '../../api/company/Companies';

const formSchema = new SimpleSchema({
  companyName: String,
  website: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class SignupCompany extends React.Component {

  // On submit, insert data.
  submit(data, formRef) {
    const { companyName, website, description } = data;
    Companies.collection.insert({ companyName, website, description },
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
            <Form.Input fluid label='Company Name:' placeholder='Ex: Company Connector' name='companyName'/>
            <Form.Input fluid label='Website:' placeholder='Website URL' name='website'/>
            <Form.TextArea label='Company Description:' placeholder='Tell us a little bit about the company...' name='description'/>
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
          </Form>
        </Tab.Pane>,
      },
    ];

    let fRef = null;

    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
        <Container>
          <Header className='cp-text' as='h1'>Create Company Profile</Header>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
        </Container>
        <SubmitField value='Submit'/>
      </AutoForm>
    );
  }
}

export default SignupCompany;
