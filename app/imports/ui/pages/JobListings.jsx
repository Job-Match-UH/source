import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Header } from 'semantic-ui-react';
import { Jobs } from '../../api/job/Jobs';
import { Companies } from '../../api/company/Companies';

class JobListings extends React.Component {
  render() {

    return (
      <Container id='job-postings-page'>
        <Header as='h1' className='cp-text' style={ { padding: 0 } }>Job Listings</Header>
        <Card.Group>

        </Card.Group>
      </Container>
    );
  }
}

JobListings.propTypes = {
  company: PropTypes.object,
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to documents.
  const subscription1 = Meteor.subscribe(Companies.userPublicationName);
  const subscription2 = Meteor.subscribe(Jobs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready();
  // Get the documents
  const company = Companies.collection.findOne(documentId);
  const jobs = Jobs.collection.find({}).fetch();
  return {
    company,
    jobs,
    ready,
  };
})(JobListings);
