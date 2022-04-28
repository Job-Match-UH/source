import React from 'react';
import { Container, Grid, Image, Header, Menu, Segment, Button, Loader, Item } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Students } from '../../api/student/Student';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';

class StudentProfile extends React.Component {
  state = { isOpen: false }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
              <Image src='https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' />
              <Button.Group widths={2} style={ { marginTop: '30px' } } >
                <Button color='green' className='cp-text'>Match Me!</Button>
                <Button color='black'>No Thanks</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' className='cp-text'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
              <Item>
                <Item.Description>{this.props.profile.about}</Item.Description>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header className='cp-text'>Education</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Header as='h3' className='cp-text'>Additional Notes</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column width={10}>
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

              <Segment>
                <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h3' className='cp-text'>Experience</Header>
              <Header className='cp-text' style={ { marginTop: 100 } } >Contact Information</Header>
              <Item>
                <Item.Description>{this.props.profile.owner}</Item.Description>
                <Item.Description>{this.props.profile.phone}</Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

StudentProfile.propTypes = {
  profile: PropTypes.object,
  experience: PropTypes.array,
  education: PropTypes.array,
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
  const profile = Students.collection.findOne(documentId);
  const experience = Experiences.collection.findOne(documentId);
  const education = Education.collection.findOne(documentId);
  return {
    profile,
    experience,
    education,
    ready,
  };
})(StudentProfile);
