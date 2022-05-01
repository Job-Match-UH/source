import React from 'react';
import { Header, Card, Container, Loader, Grid, Image, Item } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Students } from '../../api/student/Student';
import Educations from '../components/Educations';
import Experience from '../components/Experience';
import Project from '../components/Project';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';
import { Projects } from '../../api/projects/Projects';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewStudentProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Student Profile</Loader>;
  }

  renderPage() {
    return (
      <Container id='student-profile-page'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image centered size='medium' src={this.props.student.image}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={15}>
                    <Header as='h1' className='cp-text'>{this.props.student.firstName} {this.props.student.lastName}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Item>
                <Item.Description className='cp-text'>{this.props.student.owner}</Item.Description>
                <Item.Description className='cp-text'>{this.props.student.phone}</Item.Description>
                <Item.Description className='cp-text'>{this.props.student.about}</Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header className='cp-text'>Education</Header>
              <Card.Group>
                {this.props.education.map((educations, index) => <Educations
                  key={index}
                  educations={educations}/>)}
              </Card.Group>
              <Header as='h3' className='cp-text'>Experience</Header>
              <Card.Group>
                {this.props.experience.map((experiences, index) => <Experience
                  key={index}
                  experiences={experiences}/>)}
              </Card.Group>
              <Header as='h3' className='cp-text'>Projects</Header>
              <Card.Group>
                {this.props.projects.map((project, index) => <Project
                  key={index}
                  project={project}/>)}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

ViewStudentProfile.propTypes = {
  student: PropTypes.object.isRequired,
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const studentId = match.params._id;
  // Get access to documents.
  const subscription1 = Meteor.subscribe(Students.userPublicationName);
  const subscription2 = Meteor.subscribe(Experiences.userPublicationName);
  const subscription3 = Meteor.subscribe(Education.userPublicationName);
  const subscription4 = Meteor.subscribe(Projects.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
  // Get the documents
  const student = Students.collection.findOne(studentId);
  const education = Education.collection.find({ owner: student.owner });
  const experience = Experiences.collection.find({ owner: student.owner });
  const projects = Projects.collection.find({ owner: student.owner });
  return {
    student,
    education,
    experience,
    projects,
    ready,
  };
})(ViewStudentProfile);
