import React from 'react';
import { Container, Header, Form, Button, Input } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
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
    const { className, courseNumber, startMonth, endMonth, startYear, endYear } = data;
    const owner = Meteor.user().username;
    Class.collection.insert({ className, courseNumber, startMonth, endMonth, startYear, endYear, owner },
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
    return (
      <Container>
        <Header as='h1' textAlign='center'>Class Schedule</Header>
        <Form ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
          <Form.Field>
            <label>Course Title</label>
            <input placeholder='Input class title here i.e. World History' />
          </Form.Field>
          <Form.Field>
            <label>Course Number</label>
            <input placeholder='Input course number here i.e. HIST101' />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field
              id='class-schedule-start-date'
              control={Input}
              label='Start Month'
              placeholder='Month'
            />
            <Form.Field
              id='class-schedule-start-date'
              control={Input}
              label='Start Year'
              placeholder='Year'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              id='class-schedule-end-date'
              control={Input}
              label='End Month'
              placeholder='Month'
            />
            <Form.Field
              id='class-schedule-end-date'
              control={Input}
              label='End Year'
              placeholder='Year'
            />
          </Form.Group>
        </Form>
        <Button type='submit'>Add Class to Schedule</Button>
      </Container>
    );
  }
}

export default ClassScheduleForm;
