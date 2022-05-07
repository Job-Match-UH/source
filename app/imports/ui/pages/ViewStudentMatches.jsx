import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Card, Container, Loader, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Students } from '../../api/student/Student';
import { StudentTags } from '../../api/tags/StudentTags';
import Student from '../components/Student';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (allInterests) => new SimpleSchema({
  name: { type: Array, label: 'Interests', optional: true },
  'name.$': { type: String, allowedValues: allInterests },
});

function getProfile(owner) {
  return Students.collection.findOne({ owner });
}

/** Renders card containing all of the Student and Tags documents. */
class ViewStudentMatches extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.name || [] });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const allInterests = _.uniq(_.pluck(StudentTags.collection.find().fetch(), 'name'));
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const studentEmails = _.pluck(StudentTags.collection.find({ name: { $in: this.state.interests } }).fetch(), 'owner');
    const studentMatches = _.uniq(studentEmails).map(email => getProfile(email));
    return (
      <Container id='view-student-matches-page'>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <MultiSelectField id='name' name='name' showInlineError={true} placeholder={'Search by interests...'}/>
            <SubmitField value='Submit'/>
          </Segment>
        </AutoForm>
        {_.size(studentMatches) > 0 ? (
          <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        ) : ''}
        <Card.Group itemsPerRow={4}>
          {studentMatches.map((student, index) => <Student
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
  const subscription2 = Meteor.subscribe(StudentTags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Companies documents
  const students = Students.collection.find({}).fetch();
  const tags = StudentTags.collection.find({}).fetch();
  return {
    students,
    tags,
    ready,
  };
})(ViewStudentMatches);
