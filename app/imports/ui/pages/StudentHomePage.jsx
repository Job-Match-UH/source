import React from 'react';
import { Grid, Container, Button, Dropdown, Card, Image, Header } from 'semantic-ui-react';

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
class StudentHomePage extends React.Component {
  state = { options }

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }));
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })

  render() {
    const { currentValue } = this.state;
    return (
      <Container>
        <Grid textAlign='center' columns='equal'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Dropdown
                options={this.state.options}
                placeholder='Job Title, keywords or company'
                fluid
                multiple
                search
                selection
                noResultsMessage='Try another search.'
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                options={this.state.options}
                placeholder='City, state, zip code, or remote'
                fluid
                multiple
                search
                selection
                noResultsMessage='Try another search.'
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button>Find Jobs</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Dropdown placeholder='Date Posted' compact multiple selection options={options} />
            <Dropdown placeholder='Within X miles' compact multiple selection options={options} />
            <Dropdown placeholder='Salary Estimate' compact multiple selection options={options} />
            <Dropdown placeholder='Job Type' compact multiple selection options={options} />
            <Dropdown placeholder='Certification' compact multiple selection options={options} />
            <Dropdown placeholder='Shift & Schedule' compact multiple selection options={options} />
            <Dropdown placeholder='Location' compact multiple selection options={options} />
            <Dropdown placeholder='Experience Level' compact multiple selection options={options} />
          </Grid.Row>
          <Grid.Row>
            <Header as='h2'>Job Matches:</Header>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              <Card>
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
              <Card>
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
              <Card>
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
            <Header as='h2'>Check out more Recommended:</Header>
          </Grid.Row>
          <Grid.Row>
            <Card.Group>
              <Card>
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
              <Card>
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
              <Card>
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

export default StudentHomePage;
