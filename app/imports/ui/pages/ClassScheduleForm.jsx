import React from 'react';
import { Container, Header, Input } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniAutoforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Class } from '../../api/class/Class';

const formSchema = new SimpleSchema({
  className: String,
  courseNumber: Number,
  startMonth: String,
  endMonth: String,
  startYear: Number,
  endYear: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class ClassScheduleForm extends React.Component {
  submit(data, formRef) {
    const { className, courseNumber, startMonth, endMonth, startYear, endYear, owner } = data;
    Class.collection.insert({ className, courseNumber, startMonth, endMonth, startYear, endYear, owner },
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
          <TextField>
            <label>Course Title</label>
            <input placeholder='Input class title here i.e. World History' />
          </TextField>
          <TextField>
            <label>Course Number</label>
            <input placeholder='Input course number here i.e. HIST101' />
          </TextField>
          <AutoForm.Group widths='equal'>
            <TextField
              id='class-schedule-start-date'
              control={Input}
              label='Start Month'
              placeholder='Month'
            />
            <TextField
              id='class-schedule-start-date'
              control={Input}
              label='Start Year'
              placeholder='Year'
            />
          </AutoForm.Group>
          <AutoForm.Group widths='equal'>
            <TextField
              id='class-schedule-end-date'
              control={Input}
              label='End Month'
              placeholder='Month'
            />
            <TextField
              id='class-schedule-end-date'
              control={Input}
              label='End Year'
              placeholder='Year'
            />
          </AutoForm.Group>
        </AutoForm>
        <SubmitField value='Add Class'/>
      </Container>
    );
  }
}

export default ClassScheduleForm;
