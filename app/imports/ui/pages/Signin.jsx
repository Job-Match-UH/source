import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Button, Form, Grid, Header, Message, Segment, Divider, Container } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', role: '', error: '', redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  studentSubmit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ role: 'student', error: '', redirectToReferer: true });
      }
    });
  }

  companySubmit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ role: 'company', error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer && this.state.role === 'student') {
      return <Redirect to={'/viewcompanymatches'}/>;
    }
    if (this.state.redirectToReferer && this.state.role === 'company') {
      return <Redirect to={'/viewstudentmatches'}/>;
    }
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    // Otherwise return the Login form.
    // eslint-disable-next-line no-return-assign
    return (
      <Container>
        <Segment textAlign='center' borderless='true' basic>
          {this.state.error === '' && this.props.location.error === undefined ? (
            ''
          ) : (
            <Message
              error
              header="Login was not successful"
              content={`${this.state.error} ${this.props.location.error}`}
            />
          )}
        </Segment>
        <Segment placeholder id="signin-page">
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Header as="h2" textAlign="center" className='cp-text'>
              Student Login
              </Header>
              <Form error onSubmit={this.studentSubmit} className='cp-text'>
                <Form.Input
                  label='Email'
                  id="signin-form-email"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Password'
                  type='password'
                  id="signin-form-password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <Button id="signin-form-submit" content='Login' primary />
                <Message attached color='green'>
                  <Link id='view-signup-student' to="/student_signup">Click here to Register as a Student</Link>
                </Message>
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Header as="h2" textAlign="center" className='cp-text'>
                Company Login
              </Header>
              <Form error onSubmit={this.companySubmit} className='cp-text'>
                <Form.Input
                  label='Email'
                  id="signin-company-form-email"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Password'
                  type='password'
                  id="signin-company-form-password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <Button id="signin-company-form-submit" content='Login' primary />
                <Message attached color='green'>
                  <Link id='view-signup-company' to="/company_signup">Click here to Register as a Company</Link>
                </Message>
              </Form>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
      </Container>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
