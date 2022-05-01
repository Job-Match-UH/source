import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card } from 'semantic-ui-react';
import Job from '../components/Job';
import { Jobs } from '../../api/job/Jobs';

class JobListings extends React.Component {
  render() {

    return (
      <Container id='job-postings-page'>
        <Header as='h1' className='cp-text' textAlign='center'>Job Listings</Header>
        <Card.Group>
          {this.props.jobs.map((job, index) => <Job
            key={index}
            job={job}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

JobListings.propTypes = {
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to documents.
  const subscription = Meteor.subscribe(Jobs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the documents
  const jobs = Jobs.collection.find({}).fetch();
  return {
    jobs,
    ready,
  };
})(JobListings);
