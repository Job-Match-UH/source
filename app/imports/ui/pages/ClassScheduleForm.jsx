import React from 'react';
import { Container, Header, Form, Button, Input } from 'semantic-ui-react';

class ClassScheduleForm extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Class Schedule</Header>
        <Form>
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
