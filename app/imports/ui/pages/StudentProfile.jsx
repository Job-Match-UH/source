import React from 'react';
import { Container, Grid, Image, Header, Menu, Segment, Button } from 'semantic-ui-react';

class StudentProfile extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
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
              <Header as='h1' className='cp-text'>Johnny Appleseed</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header className='cp-text'>Education</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
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
              </Menu>

              <Segment>
                <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h3' className='cp-text'>Experience</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

              <Header className='cp-text' style={ { marginTop: 100 } } >Contact Information</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default StudentProfile;
