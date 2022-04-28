import React from 'react';
import { Grid, Header, Loader, Container, Menu, Item, Image, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import Educations from '../components/Educations';
import { Students } from '../../api/student/Student';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';

class StudentProfile extends React.Component {
  state = { isOpen: false }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render student profile page according to current user
  renderPage() {
    const { activeItem } = this.state;
    return (
      <Container id='student-profile-page'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image centered size='medium' src={this.props.students.image}/>
              {/* <Button.Group widths={2} style={ { marginTop: '30px' } } > */}
              {/*  <Button color='green' className='cp-text'>Match Me!</Button> */}
              {/*  <Button color='black'>No Thanks</Button> */}
              {/* </Button.Group> */}
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h1' className='cp-text'>{this.props.students.firstName} {this.props.students.lastName}</Header>
              <Item>
                <Item.Description className='cp-text'>{this.props.students.owner}</Item.Description>
                <Item.Description className='cp-text'>{this.props.students.phone}</Item.Description>
                <Item.Description className='cp-text'>{this.props.students.about}</Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Menu pointing>
                <Menu.Item
                  name='interests'
                  active={activeItem === 'interests'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='honors/certifications'
                  active={activeItem === 'honors/certifications'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='skills'
                  active={activeItem === 'skills'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='projects'
                  active={activeItem === 'projects'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='classes'
                  active={activeItem === 'classes'}
                  onClick={this.handleItemClick}
                />
              </Menu>
              <Header className='cp-text'>Education</Header>
              <Card.Group>
                {this.props.education.map((educations, index) => <Educations
                  key={index}
                  education={educations}/>)}
              </Card.Group>
              {/* <Header as='h3' className='cp-text'>Experience</Header> */}
              {/* {this.props.experience.map((experiences, index) => <Container */}
              {/*  key={index} */}
              {/*  experience={experiences}> */}
              {/* </Container>)} */}
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to documents.
  const subscription1 = Meteor.subscribe(Students.userPublicationName);
  const subscription2 = Meteor.subscribe(Experiences.userPublicationName);
  const subscription3 = Meteor.subscribe(Education.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
  // Get the documents
  const students = Students.collection.findOne(documentId);
  const education = Education.collection.find({}).fetch();
  const experience = Experiences.collection.find({}).fetch();
  // const experience = _.filter(allExperience, function (exp) { return students.owner === exp.owner; });
  return {
    students,
    education,
    experience,
    ready,
  };
})(StudentProfile);
