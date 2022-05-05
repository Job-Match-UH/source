import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/job/Jobs';
import JobProfile from '../components/JobProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewJobDescription extends React.Component {
  render() {
    return (
      <Container id='view-job-description'>
        {this.props.jobs.map((job, index) => <JobProfile
          key={index}
          job={job}
        />)}
      </Container>
    );
  }
}

// Require an array of Jobs documents in the props.
ViewJobDescription.propTypes = {
  jobs: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to jobs documents.
  const subscription = Meteor.subscribe(Jobs.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready();
  // Get the Jobs documents
  const jobs = Jobs.collection.find({}).fetch();
  return {
    jobs,
    ready,
  };
})(ViewJobDescription);
