import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Header, Placeholder, Tab } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField, NumField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Companies } from '../../api/company/Companies';

const companySchema = new SimpleSchema({
  companyName: String,
  website: String,
  description: { type: String, optional: true, defaultValue: '' },
  address: String,
  state: String,
  phone: Number,
  year: Number,
});

const companyBridge = new SimpleSchema2Bridge(companySchema);

/* Renders the Page for adding a company. */
class SignupCompany extends React.Component {

  // On submit, insert data.
  submit(data, formRef) {
    const { companyName, website, description, address, state, phone, year } = data;
    const owner = Meteor.user().username;
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
    const companyPanes = [

      {
        menuItem: 'Company Description', render: () => <Tab.Pane>
          <Form.Input fluid label='Company Logo:'>
            <Placeholder style={{ height: 150, width: 150 }}>
              <Placeholder.Image/>
            </Placeholder>
          </Form.Input>
          <Button compact size='mini'>Select Photo</Button>
          <TextField fluid label={'Company Name:'} placeholder={'Ex: Company Connector'} name={'companyName'}/>
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
                <NumField placeholder='1234567890' name='phone'/>
              </Form.Field>
            </Form.Group>
            <NumField fluid label='Year Established:' placeholder='Ex: 2000' name='year'/>
          </Form>
        </Tab.Pane>,
      },
    ];

    return (
      <Container>
        <Header className='cp-text' as='h1'>Create Company Profile</Header>
        <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={companyBridge} onSubmit={data => this.submit(data, fRef)}>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={companyPanes}/>
          <SubmitField value='Submit Profile'/>
        </AutoForm>
      </Container>
    );
  }
}

export default SignupCompany;
