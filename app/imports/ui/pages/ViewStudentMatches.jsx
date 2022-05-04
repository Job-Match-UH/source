import React from 'react';
import { Header, Card, Container, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Student from '../components/Student';
import { Students } from '../../api/student/Student';
import { Tags } from '../../api/tags/Tags';

/** Renders card containing all of the Student and Tags documents. */
class ViewStudentMatches extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='view-student-matches'>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Header as='h1' className='cp-text' textAlign='center'>Admin (Company Profiles)</Header>
        ) : (
          <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        )}

        <Card.Group itemsPerRow={4}>
          {this.props.students.map((student, index) => <Student
            key={index}
            student={student}
            tags={this.props.tags.filter(tag => (tag.owner === student.owner))}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Student documents in the props.
ViewStudentMatches.propTypes = {
  students: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to companies documents.
  const subscription = Meteor.subscribe(Students.userPublicationName);
  // Get access to tags documents.
  const subscription2 = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Companies documents
  const students = Students.collection.find({}).fetch();
  const tags = Tags.collection.find({}).fetch();
  return {
    students,
    tags,
    ready,
  };
})(ViewStudentMatches);
