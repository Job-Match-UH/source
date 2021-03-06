import React from 'react';
import { Grid, Header, Loader, Container, Item, Image, Card, Icon, Tab } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Educations from '../components/Educations';
import Experience from '../components/Experience';
import Project from '../components/Project';
import { Students } from '../../api/student/Student';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';
import { Projects } from '../../api/projects/Projects';
import AddProject from './AddProject';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';
import AddInterest from './AddInterest';
import Tag from '../components/Tag';
import { StudentTags } from '../../api/tags/StudentTags';

class StudentProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'interests',
    };
  }
  // state = { isOpen: false }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render student profile page according to current user
  renderPage() {
    const panes = [
      { menuItem: 'Education', render: () => <Tab.Pane>
        <AddEducation owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Experience', render: () => <Tab.Pane>
        <AddExperience owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Projects', render: () => <Tab.Pane>
        <AddProject owner={Meteor.user().username}/>
      </Tab.Pane> },

      { menuItem: 'Interests', render: () => <Tab.Pane>
        <AddInterest owner={Meteor.user().username}/>
      </Tab.Pane> },
    ];

    const styling = { padding: '0px' };

    return (
      <Container id='student-profile-page'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image centered size='medium' src={this.props.students.image}/>
            </Grid.Column>
            <Grid.Column width={13}>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={15}>
                    <Header style={ { fontSize: 'xxx-large', padding: 0 } } className='cp-text'>{this.props.students.firstName} {this.props.students.lastName}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Link id='goto-edit-student' to={`/editstudent/${this.props.students._id}`}><Icon size='large' name='pencil'/></Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Item style={{ padding: 10 }}>
                <Item.Description className='cp-text' style={ { fontSize: 'large' } }>{this.props.students.owner}</Item.Description>
                <Item.Description className='cp-text' style={ { fontSize: 'large' } }>{this.props.students.phone}</Item.Description>
                <Item.Description className='cp-text' style={ { fontSize: 'large' } }>{this.props.students.address}</Item.Description>
                <Item.Description className='cp-text' style={ { fontSize: 'large' } }>{this.props.students.about}</Item.Description>
                <Header as='h3' className='cp-text' style={styling}>Interests</Header>
                <Item.Description className='cp-text'>
                  {this.props.tags.map((tags, index) => <Tag
                    key={index}
                    tag={tags}
                  />)}
                </Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Header className='cp-text' style={ { fontSize: 'xx-large', padding: 0 } }>Education</Header>
              { _.size(_.filter(Education.collection.find().fetch(), (edu) => (edu.owner === this.props.students.owner))) <= 0 ?
                (
                  <Header className='cp-text' style={ { fontSize: 'large', padding: 0 } }>Enter your education(s)</Header>
                ) : ''}
              <Card.Group>
                {this.props.education.map((educations, index) => <Educations
                  key={index}
                  educations={educations}/>)}
              </Card.Group>
              <Header className='cp-text' style={ { fontSize: 'xx-large', padding: 0 } }>Experience</Header>
              { _.size(_.filter(Experiences.collection.find().fetch(), (exp) => (exp.owner === this.props.students.owner))) <= 0 ?
                (
                  <Header className='cp-text' style={ { fontSize: 'large', padding: 0 } }>Enter your experience(s)</Header>
                ) : ''}
              <Card.Group>
                {this.props.experience.map((experiences, index) => <Experience
                  key={index}
                  experiences={experiences}/>)}
              </Card.Group>
              <Header className='cp-text' style={ { fontSize: 'xx-large', padding: 0 } }>Projects</Header>
              { _.size(_.filter(Projects.collection.find().fetch(), (pro) => (pro.owner === this.props.students.owner))) <= 0 ?
                (
                  <Header className='cp-text' style={ { fontSize: 'large', padding: 0 } }>Enter your projects(s)</Header>
                ) : ''}
              <Card.Group>
                {this.props.projects.map((project, index) => <Project
                  key={index}
                  project={project}/>)}
              </Card.Group>
            </Grid.Column>
            <Grid.Column width={7}>
              <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

StudentProfile.propTypes = {
  students: PropTypes.object,
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  tags: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to documents.
  const subscription1 = Meteor.subscribe(Students.userPublicationName);
  const subscription2 = Meteor.subscribe(Experiences.userPublicationName);
  const subscription3 = Meteor.subscribe(Education.userPublicationName);
  const subscription4 = Meteor.subscribe(Projects.userPublicationName);
  const subscription5 = Meteor.subscribe(StudentTags.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready() && subscription5.ready();
  // Get the documents
  const email = Meteor.users.findOne(documentId).username;
  const students = Students.collection.findOne({ owner: email });
  const education = Education.collection.find({}).fetch();
  const experience = Experiences.collection.find({}).fetch();
  const projects = Projects.collection.find({}).fetch();
  const tags = StudentTags.collection.find({ owner: students.owner });
  return {
    students,
    education,
    experience,
    projects,
    tags,
    ready,
  };
})(StudentProfile);
