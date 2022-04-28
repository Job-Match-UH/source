import React from 'react';
import { Container, Image, Grid, Header, List, Loader, HiddenField, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';

const bridge = new SimpleSchema2Bridge(Companies.schema);

export class CompanyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container id='company-profile-page'>
        <Grid celled='internally' className='cp-text' schema={bridge} model={this.props.doc}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={'https://www.logolynx.com/images/logolynx/0b/0b7c31144d4dbc850736f64b217e9168.gif'}/>
              <Button circular fluid className='cp-text' name='website'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header style={ { fontSize: 30 } } className='cp-text' name='companyName'/>
              <div name='description'/>
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
          <HiddenField name='owner' />
        </Grid>
      </Container>
    );
  }
}

// Require the presence of a Company document in the props object. Uniforms adds 'model' to the props, which we use.
CompanyProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Company documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Companies.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(CompanyProfile);
