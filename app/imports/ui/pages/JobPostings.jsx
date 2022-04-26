import React from 'react';
import { AutoForm, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Container, Header, Form } from 'semantic-ui-react';
import { Jobs } from '../../api/job/Jobs';

const jobSchema = new SimpleSchema({
  jobTitle: String,
  jobID: Number,
  pay: Number,
  payType: String,
  location: String,
  jobDescription: String,
  qualifications: String,
});

const jobBridge = new SimpleSchema2Bridge(jobSchema);

class JobPostings extends React.Component {
  submitJob(data, formRef) {
    const { jobTitle, jobID, pay, location, jobDescription, qualifications, payType } = data;
    const owner = Meteor.user().username;
    Jobs.collection.insert({ jobTitle, jobID, pay, location, jobDescription, qualifications, owner, payType },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Job Posting added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    const payTypes = ['hourly', 'annually'];

    return (
      <Container>
        <Header as='h1' className='cp-text' style={ { padding: 0 } }>Add a Job Posting</Header>
        <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={jobBridge} onSubmit={data => this.submitJob(data, fRef)}>
          <TextField fluid label='Job Title:' placeholder='Software Development Intern' name='jobTitle'/>
          <TextField fluid label='Job ID:' placeholder='1234567' name='jobID'/>
          <Form.Group widths='equal'>
            <NumField fluid="true" label='Pay:' placeholder='25' name='pay'/>
            <SelectField fluid="true" placeholder='hourly' name='payType' allowedValues={payTypes}/>
          </Form.Group>
          <TextField fluid label='Location:' placeholder='Ex. Honolulu, HI' name='location'/>
          <LongTextField label='Job Description:' placeholder='Give a small description about the job position...' name='jobDescription'/>
          <LongTextField label='Qualifications:' placeholder='List the desired interests for this position...' name='qualifications'/>
          <SubmitField value='Submit Job'/>
        </AutoForm>
      </Container>
    );
  }
}

export default JobPostings;
