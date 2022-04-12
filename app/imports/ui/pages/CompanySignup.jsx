import React from 'react';
import { Container, Form, Grid, Menu } from 'semantic-ui-react';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class CompanySignup extends React.Component {
  state = { activeItem: 'Company Description' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Menu pointing vertical>
                  <Menu.Item
                    name='Company Description'
                    active={activeItem === 'Company Description'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Interests'
                    active={activeItem === 'Interests'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Company Details'
                    active={activeItem === 'Company Details'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Job Postings'
                    active={activeItem === 'Job Postings'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>
              <Grid.Column width={10}>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Address' placeholder='Address' />
                    <Form.Input fluid label='Phone Number' placeholder='(xxx) xxx - xxxx' />
                  </Form.Group>
                  <Form.TextArea label='About' placeholder='Tell us more about you...' />
                  <Form.Input fluid label='Profile Picture' placeholder='URL image'></Form.Input>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default CompanySignupSignup;
