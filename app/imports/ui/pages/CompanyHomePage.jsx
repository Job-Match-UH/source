import React from 'react';
import { Grid, Container, Button, Card, Image, Header, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
];

const pfp = 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg';

/** Renders the Page. */
class CompanyHomePage extends React.Component {
  render() {
    return (
      <Container id='company-home-page'>
        <Grid textAlign='center'>
          <Grid.Row>
            <Header as='h2' className='cp-text'>Filter Student Profiles by:</Header>
          </Grid.Row>
          <Grid.Row>
            <Dropdown placeholder='Certification' compact multiple selection options={options} />
            <Dropdown placeholder='Availability' compact multiple selection options={options} />
            <Dropdown placeholder='Qualifications' compact multiple selection options={options} />
            <Dropdown placeholder='Experience Level' compact multiple selection options={options} />
          </Grid.Row>
          <Grid.Row>
            <Header as='h2' className='cp-text'>Student Candidate Matches:</Header>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Steve Sanders</Card.Header>
                  <Card.Meta>Friends of Elliot</Card.Meta>
                  <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Molly Thomas</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Jenny Lawrence</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Jenny requested permission to view your contact details
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Steve Sanders</Card.Header>
                  <Card.Meta>Friends of Elliot</Card.Meta>
                  <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Molly Thomas</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Molly wants to add you to the group <strong>musicians</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
              <Card as={NavLink} exact to="/studentprofile">
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src={pfp}
                  />
                  <Card.Header>Jenny Lawrence</Card.Header>
                  <Card.Meta>New User</Card.Meta>
                  <Card.Description>
                    Jenny requested permission to view your contact details
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Add to Interested
                    </Button>
                    <Button basic color='red'>
                      Not Interested
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CompanyHomePage;
