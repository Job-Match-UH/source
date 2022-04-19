import React from 'react';
import { Container, Form, Grid, Menu } from 'semantic-ui-react';

class Signup extends React.Component {

  state = { activeItem: 'Personal Info' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
                    name='Personal Info'
                    active={activeItem === 'Personal Info'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Interests'
                    active={activeItem === 'Interests'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Projects'
                    active={activeItem === 'Projects'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Experience'
                    active={activeItem === 'Experience'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Education'
                    active={activeItem === 'Education'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Documents'
                    active={activeItem === 'Documents'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='Page Preview'
                    active={activeItem === 'Page Preview'}
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
                  <Form.Input fluid label='Profile Picture' placeholder='URL image'/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Signup;
