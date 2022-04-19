import React from 'react';
import { Container, Grid, Image, Header, Menu, Segment, Card, Button } from 'semantic-ui-react';
import ClassSchedule from './ClassScheduleForm';

class StudentProfile extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const studentStyle = { color: '#6dcf6d' };
    return (
      <Container>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' />
              <Button.Group fluid style={ { marginTop: 10 } }>
                <Button primary>Edit</Button>
                <Button secondary>Add</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' style={studentStyle}>Johnny Appleseed</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header style={studentStyle}>Education</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Header as='h3' style={studentStyle}>Additional Notes</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              <Card fluid>
                <ClassSchedule/>
              </Card>
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
              </Menu>

              <Segment>
                <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h3' style={studentStyle}>Experience</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

              <Header style={ { marginTop: 100, color: '#6dcf6d' } } >Contact Information</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default StudentProfile;
