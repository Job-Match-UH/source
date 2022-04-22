import React from 'react';
import { Header, Card, Image, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const pfp = 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewCompanyMatches extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        <Card.Group itemsPerRow={4}>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Itadori Yuji</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Fushiguro Megumi</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Gojou Satoru</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Getou Suguru</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Zenin Maki</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Inumaki Toge</Card.Header>
              <Card.Meta>Friends of Elliot</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Nanami Kento</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={NavLink} exact to="/companyprofile">
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={pfp}
              />
              <Card.Header>Ryoumen Sukuna</Card.Header>
              <Card.Meta>New User</Card.Meta>
              <Card.Description>
                Matched with you!
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}

export default ViewCompanyMatches;
