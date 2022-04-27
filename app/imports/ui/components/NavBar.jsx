import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const color = '#2d5144';
    const menuStyle = { marginBottom: '10px', backgroundColor: color, fontFamily: 'Playfair Display' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item><Image src="https://github.com/Job-Match-UH/source/blob/main/images/uhmLOGO.png?raw=true" size='tiny' fluid /></Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1' style={ { fontFamily: 'Playfair Display' } }>Job Match&apos;UH</Header>
        </Menu.Item>
        {Roles.userIsInRole(Meteor.userId(), 'student') ? (
          [
            <Menu.Item id='view-student-profile' as={NavLink} activeClassName="active" exact to="/studentprofile" key='student'>My Profile</Menu.Item>,
            <Menu.Item id='view-student-home' as={NavLink} activeClassName="active" exact to="/studenthomepage" key='student'>Match Me!</Menu.Item>,
            <Menu.Item id='view-company-matches' as={NavLink} activeClassName="active" exact to="/viewcompanymatches" key='student'>View my Matches</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'company') ? (
          [
            <Menu.Item id='view-company-profile' as={NavLink} activeClassName="active" exact to="/companyprofile" key='company'>My Profile</Menu.Item>,
            <Menu.Item id='view-company-home' as={NavLink} activeClassName="active" exact to="/companyhomepage" key='company'>Match Me!</Menu.Item>,
            <Menu.Item id='view-student-matches' as={NavLink} activeClassName="active" exact to="/viewstudentmatches" key='company'>View my Matches</Menu.Item>,
            <Menu.Item id='job-postings' as={NavLink} activeClassName="active" exact to="/jobpostings" key='company'>Job Postings</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item id='view-admin-home' as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Menu.Item id="login-dropdown-sign-in" pointing="top right" as={NavLink} exact to="/signin">Login / Sign Up</Menu.Item>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
