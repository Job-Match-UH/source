import React from 'react';
import { Header, Card, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Student from '../components/Student';
import { Students } from '../../api/student/Student';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewStudentMatches extends React.Component {
  render() {
    return (
      <Container id='view-student-matches'>
        <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        <Card.Group itemsPerRow={4}>
          {this.props.students.map((student, index) => <Student
            key={index}
            student={student}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

ViewStudentMatches.propTypes = {
  students: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to companies documents.
  const subscription = Meteor.subscribe(Students.userPublicationName);
  // Get access to tags documents.
  // const subscription2 = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready();
  // Get the Companies documents
  const students = Students.collection.find({}).fetch();
  // const tags = Tags.collection.find({}).fetch();
  return {
    students,
    ready,
  };
})(ViewStudentMatches);
