import React from 'react';
import { Button, Container, Form, Header, Icon, Placeholder, Tab } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Companies } from '../../api/company/Companies';

const formSchema = new SimpleSchema({
  companyName: String,
  website: String,
  description: String,
  address: String,
  state: String,
  phone: Number,
  year: Number,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Page for adding a company. */
class SignupCompany extends React.Component {

  // On submit, insert data.
  submit(data, formRef) {
    const { companyName, website, description, address, state, phone, year, owner } = data;
    Companies.collection.insert({ companyName, website, description, address, state, phone, year, owner },
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
    const panes = [

      {
        menuItem: 'Company Description', render: () => <Tab.Pane>
          <Form.Input fluid label='Company Logo:'>
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image/>
            </Placeholder>
          </Form.Input>
          <Button compact size='mini'>Select Photo</Button>
          <TextField fluid label={'Company Name:'} placeholder={'Ex: Company Connector'} name={'companyName'}/>
          <TextField fluid label={'Email:'} placeholder={'Ex: Company Email'} name={'owner'}/>
          <TextField fluid label={'Website:'} placeholder={'Website URL'} name={'website'}/>
          <LongTextField label={'Company Description:'} placeholder={'Tell us a little bit about the company...'} name={'description'}/>
        </Tab.Pane>,
      },

      {
        menuItem: 'Company Details', render: () => <Tab.Pane>
          <Form>
            <Form.Group unstackable widths={2}>
              <TextField fluid label='Address:' placeholder='Address' name='address'/>
              <TextField fluid label='State:' placeholder='Ex: HI' name='state'/>
            </Form.Group>
            <Form.Group inline>
              <Form.Field>
                <label>Phone Number:</label>
                <NumField placeholder='(xxx)' name='phone'/>
              </Form.Field>
            </Form.Group>
            <TextField fluid label='Year Established:' placeholder='Ex: 2000' name='year'/>
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

    return (
      <Container>
        <Header className='cp-text' as='h1'>Create Company Profile</Header>
        <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
          <SubmitField value='Submit'/>
        </AutoForm>
      </Container>
    );
  }
}

export default SignupCompany;
