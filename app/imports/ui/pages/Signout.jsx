import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Header id="signout-page" as="h2" textAlign="center" className='cp-text' style={ { fontSize: 'xx-large' } }>
        <p style={ { padding: '200px', minHeight: 100 } }>You are signed out.</p>
      </Header>
    );
  }
}
