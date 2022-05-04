import React from 'react';
import { Header, Card, Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import Company from '../components/Company';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';

/** Renders card containing all of the Company and Tags documents. */
class ViewCompanyMatches extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='view-company-matches'>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Header as='h1' className='cp-text' textAlign='center' key='header1'>Admin (Viewing Student Profiles)</Header>
        ) : (
          <Header as='h2' className='cp-text' textAlign='center' key='header2'>Interested Matches!</Header>
        )}

        <Card.Group itemsPerRow={4}>
          {this.props.companies.map((company, index) => <Company
            key={index}
            company={company}
            tags={this.props.tags.filter(tag => (tag.owner === company.owner))}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Companies documents in the props.
ViewCompanyMatches.propTypes = {
  companies: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to companies documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Get access to tags documents.
  const subscription2 = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Companies documents
  const companies = Companies.collection.find({}).fetch();
  const tags = Tags.collection.find({}).fetch();
  return {
    companies,
    tags,
    ready,
  };
})(ViewCompanyMatches);
