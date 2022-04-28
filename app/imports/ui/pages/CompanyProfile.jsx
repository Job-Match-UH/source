import React from 'react';
import { Container, Image, Grid, Header, List, Loader, HiddenField, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';
import { Jobs } from '../../api/job/Jobs';

const bridge = new SimpleSchema2Bridge(Companies.schema);

/** Returns the Profile and associated Projects and jobListings associated with the passed user email/owner. */
function getCompanyData(owner) {
  const data = Companies.collection.findOne({ owner });
  const jobListing = _.pluck(Jobs.collection.find({ owner: owner }).fetch(), 'jobTitle');
  return _.extend({ }, data, { jobListing });
}

export class CompanyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container id='company-profile-page'>
        <Grid celled='internally' className='cp-text'>
          <Grid.Row schema={bridge} model={this.props.doc}>
            <Grid.Column width={3}>
              <Image name='image'/>
              <Button circular fluid className='cp-text' name='website'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header style={ { fontSize: 30 } } className='cp-text' name='companyName'/>
              <div name='description'/>
            </Grid.Column>
            <Grid.Column width={3}>
              <div name='address'/>
              <div name='state'/>
              <div name='phone'/>
              <div name='year'/>
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

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  const documentId = match.params._id;

  return {
    ready: sub1.ready() && sub2.ready(),
    doc: Companies.collection.findOne(documentId),
  };
})(CompanyProfile);
