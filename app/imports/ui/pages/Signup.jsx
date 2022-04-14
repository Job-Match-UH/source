import React from 'react';
// import PropTypes from 'prop-types';
// import { Link, Redirect } from 'react-router-dom';
// import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Container, Form, Grid, Menu } from 'semantic-ui-react';
// import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
/*
  /!* Initialize state fields. *!/
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /!* Update the form controls each time the user interacts with them. *!/
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /!* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. *!/
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }
  */
  state = { activeItem: 'Personal Info' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    /*
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    */
    const { activeItem } = this.state;
    return (
    /*
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      */
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

/*
/!* Ensure that the React Router location object is available in case we need to redirect. *!/
Signup.propTypes = {
  location: PropTypes.object,
};
*/

export default Signup;
