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
  jobID: { type: SimpleSchema.Integer, min: 0 }, // can also use String as type
  pay: { type: SimpleSchema.Integer, min: 0 }, // can also use String as type
  jobType: String,
  payType: String,
  location: String,
  jobDescription: String,
  qualifications: String,
});

const jobBridge = new SimpleSchema2Bridge(jobSchema);

class JobPostings extends React.Component {
  submitJob(data, formRef) {
    const { jobTitle, jobID, pay, location, jobDescription, qualifications, payType, jobType } = data;
    const owner = Meteor.user().username;
    Jobs.collection.insert({ jobTitle, jobID, pay, location, jobDescription, qualifications, owner, payType, jobType },
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
    const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Seasonal'];

    return (
      <Container id='job-postings-page'>
        <Header as='h1' className='cp-text' style={ { padding: 0, fontSize: 'xx-large' } }>Add a Job Posting</Header>
        <AutoForm className='cp-text' ref={ref => { fRef = ref; }} schema={jobBridge} onSubmit={data => this.submitJob(data, fRef)}>
          <TextField id='job-title' fluid label='Job Title:' placeholder='Software Development Intern' name='jobTitle' style={ { fontSize: 'large' } }/>
          <Form.Group widths='equal'>
            <TextField id='job-id' fluid label='Job ID:' placeholder='1234567' name='jobID' style={ { fontSize: 'large' } }/>
            <SelectField id='job-type' fluid="true" placeholder='Select job type' name='jobType' allowedValues={jobTypes} style={ { fontSize: 'large' } }/>
          </Form.Group>
          <Form.Group widths='equal'>
            <NumField id='job-pay' fluid="true" label='Pay:' placeholder='25' name='pay' style={ { fontSize: 'large' } }/>
            <SelectField id='pay-type' fluid="true" placeholder='Select pay type' name='payType' allowedValues={payTypes} style={ { fontSize: 'large' } }/>
          </Form.Group>
          <TextField id='job-location' fluid label='Location:' placeholder='Ex. Honolulu, HI' name='location' style={ { fontSize: 'large' } }/>
          <LongTextField id='job-description' label='Job Description:' placeholder='Give a small description about the job position...' name='jobDescription' style={ { fontSize: 'large' } }/>
          <LongTextField id='job-qualifications' label='Qualifications:' placeholder='List the desired interests for this position...' name='qualifications' style={ { fontSize: 'large' } }/>
          <SubmitField id='submit-job-posting' value='Submit Job'/>
        </AutoForm>
      </Container>
    );
  }
}

export default JobPostings;
