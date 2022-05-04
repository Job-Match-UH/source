import React from 'react';
import { Header, Card, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/job/Jobs';
// import { Tags } from '../../api/tags/Tags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewJobDescription extends React.Component {
  render() {
    return (
      <Container id='view-job-description'>
        <Header as='h2' className='cp-text' textAlign='center'>Available Jobs</Header>
        <Card.Group itemsPerRow={4}>
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Jobs documents in the props.
ViewJobDescription.propTypes = {
  jobs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to jobs documents.
  const subscription = Meteor.subscribe(Jobs.userPublicationName);
  // Get access to tags documents.
  // const subscription2 = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready();
  // Get the Jobs documents
  const jobs = Jobs.collection.find({}).fetch();
  // const tags = Tags.collection.find({}).fetch();
  return {
    jobs,
    // tags,
    ready,
  };
})(ViewJobDescription);
