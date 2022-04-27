import React from 'react';
import { Header, Card, Button, Image, Container, Tab } from 'semantic-ui-react';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminHomePage extends React.Component {

  render() {
    const panes = [

      {
        menuItem: 'Company Profile', render: () => <Tab.Pane>
          <Card color='green'>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
              />
              <Card.Header>Pear Inc.</Card.Header>
              <Card.Meta>Company</Card.Meta>
              <Card.Description>
                Overpriced tech retail store.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'>
            View
                </Button>
                <Button basic color='red'>
            Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Tab.Pane>,
      },

      {
        menuItem: 'Student Profile', render: () => <Tab.Pane>
          <Card color='green'>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              />
              <Card.Header>Molly Thomas</Card.Header>
              <Card.Meta>Student</Card.Meta>
              <Card.Description>
            Senior, Computer Science major, expected graduation Spring 2023.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'>
            View
                </Button>
                <Button basic color='red'>
            Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Card color='green'>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
              />
              <Card.Header>Jenny Lawrence</Card.Header>
              <Card.Meta>Student</Card.Meta>
              <Card.Description>
            Graduate student, BS in Sociology, BS in Data Science.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='grey'>
            View
                </Button>
                <Button basic color='red'>
            Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Tab.Pane>,
      },
    ];

    return (
      <div>
        <Container id='admin-home-page' textAlign='center'>
          <Header as='h1' className='cp-text'>Admin Home Page</Header>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes}/>
        </Container>
      </div>
    );
  }
}

export default AdminHomePage;
