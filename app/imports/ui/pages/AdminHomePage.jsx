import React from 'react';
import { Header, Card, Container, Button, Image } from 'semantic-ui-react';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminHomePage extends React.Component {
  render() {
    return (
      <div className='admin-home'>
        <Container id='admin-home'>
          <Header inverted as="h2" textAlign="center">Admin Home</Header>
          <Card.Group centered>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='https://philipmjohnson.github.io/images/philip2.jpeg'
              />
              <Card.Header>Philip Johnson</Card.Header>
              <Card.Meta>Friends of Brandon</Card.Meta>
              <Card.Description>
              Philip wants to add you to the group <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                Approve
                </Button>
                <Button basic color='red'>
                Decline
                </Button>
              </div>
            </Card.Content>
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default AdminHomePage;
