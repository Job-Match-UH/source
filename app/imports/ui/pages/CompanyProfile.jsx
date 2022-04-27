import React from 'react';
import { Container, Image, Grid, Header, List, Button } from 'semantic-ui-react';

export class CompanyProfile extends React.Component {
  render() {
    return (
      <Container id='company-profile-page'>
        <Grid celled='internally' className='cp-text'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={'https://www.logolynx.com/images/logolynx/0b/0b7c31144d4dbc850736f64b217e9168.gif'}/>
              <Button circular fluid className='cp-text'>Website Link</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header style={ { fontSize: 30 } } className='cp-text'>Pear</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
            <Grid.Column width={3}>
              <Image style={ { margin: 10 } } src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

              <Image style={ { margin: 10 } } src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

              <Image style={ { margin: 10 } } src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Button.Group widths={2}>
                <Button color='green' className='cp-text'>Match Me!</Button>
                <Button color='black'>No Thanks</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={10}>
              <List divided relaxed className='cp-text'>
                <List.Item style={ { fontSize: 30 } }>Job Listings</List.Item>
                <List.Item className='cp-text'>
                  <List.Icon name='briefcase' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                    <List.Description as='a'>Updated 10 mins ago</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item className='cp-text'>
                  <List.Icon name='briefcase' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                    <List.Description as='a'>Updated 22 mins ago</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item className='cp-text'>
                  <List.Icon name='briefcase' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                    <List.Description as='a'>Updated 34 mins ago</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CompanyProfile;
