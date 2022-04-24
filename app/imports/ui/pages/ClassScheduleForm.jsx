import React from 'react';
import { Container, Header, Input } from 'semantic-ui-react';
import { AutoForm, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Class } from '../../api/class/Class';

const formSchema = new SimpleSchema({
  className: String,
  courseNumber: String,
  startMonth: String,
  endMonth: String,
  startYear: Number,
  endYear: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class ClassScheduleForm extends React.Component {
  submit(data, formRef) {
    const { className, courseNumber, startMonth, endMonth, startYear, endYear } = data;
    Class.collection.insert({ className, courseNumber, startMonth, endMonth, startYear, endYear },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Class added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <Container>
        <Header as='h1' textAlign='center'>Class Schedule</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <TextField
            name='className'
            label='Course Title'
            placeholder='Input class title here i.e. World History'/>
          <TextField
            name='courseNumber'
            label='Course Number'
            placeholder='Input course number here i.e. HIST101'/>
          <AutoForm.Group widths='equal'>
            <TextField
              name='startMonth'
              id='class-schedule-start-date'
              control={Input}
              label='Start Month'
              placeholder='Month'
            />
            <NumField
              name='startYear'
              id='class-schedule-start-date'
              control={Input}
              label='Start Year'
              placeholder='Year'
            />
          </AutoForm.Group>
          <AutoForm.Group widths='equal'>
            <TextField
              name='endMonth'
              id='class-schedule-end-date'
              control={Input}
              label='End Month'
              placeholder='Month'
            />
            <NumField
              name='endYear'
              id='class-schedule-end-date'
              control={Input}
              label='End Year'
              placeholder='Year'
            />
          </AutoForm.Group>
          <SubmitField value='Add Class'/>
        </AutoForm>
      </Container>
    );
  }
}

export default ClassScheduleForm;
