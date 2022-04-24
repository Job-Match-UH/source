import React from 'react';
import { Container, Header, Form } from 'semantic-ui-react';
import { AutoForm, DateField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Class } from '../../api/class/Class';

const formSchema = new SimpleSchema({
  className: String,
  courseNumber: String,
  class_start: Date,
  class_end: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class ClassScheduleForm extends React.Component {
  submit(data, formRef) {
    const { className, courseNumber, class_start, class_end } = data;
    Class.collection.insert({ className, courseNumber, class_start, class_end },
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
          <Form.Group widths='equal'>
            <DateField
              label='Start Date'
              name='class_start'
            />
            <DateField
              label='End Date'
              name='class_end'
            />
          </Form.Group>
          <SubmitField value='Add Class'/>
        </AutoForm>
      </Container>
    );
  }
}

export default ClassScheduleForm;
