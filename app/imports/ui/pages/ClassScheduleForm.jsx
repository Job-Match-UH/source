import React from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';

class ClassScheduleForm extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Class Schedule</Header>
        <Form>
          <Form.Field>
            <label>Course Title</label>
            <input placeholder='Input class title here' />
          </Form.Field>
          <Form.Group inline>
            <label>Size</label>
            <Form.Radio
                label='Monday'
                value='sm'
                checked={value === 'sm'}
                onChange={this.handleChange}
            />
            <Form.Radio
                label='Thuesday'
                value='md'
                checked={value === 'md'}
                onChange={this.handleChange}
            />
            <Form.Radio
                label='Large'
                value='lg'
                checked={value === 'lg'}
                onChange={this.handleChange}
            />
        </Form>
        <Button type='submit'>Add Class to Schedule</Button>
      </Container>
    );
  }
}

export default ClassScheduleForm;
