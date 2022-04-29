import React from 'react';
import { Container, Image, Grid, Header, Loader, HiddenField, Button, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';
import { Jobs } from '../../api/job/Jobs';
import Job from '../components/Job';
import company from '../components/Company';

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
              <Image name='image'/>
              <Button circular fluid className='cp-text' name='website'/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header style={ { fontSize: 30 } } className='cp-text'>{this.props.doc.companyName}</Header>
              <div>{this.props.doc.description}</div>
            </Grid.Column>
            <Grid.Column width={3}>
              <div>{this.props.doc.address}</div>
              <div>{this.props.doc.state}</div>
              <div>{this.props.doc.phone}</div>
              <div>{this.props.doc.year}</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Card.Group>
                {this.props.job.map((job, index) => <Job
                  key={index}
                  job={this.props.job.filter(job.owner === company._id)}/>)}
              </Card.Group>
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
  job: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;

  return {
    ready: sub1.ready() && sub2.ready(),
    doc: Companies.collection.findOne(documentId),
    job: Jobs.collection.find({}).fetch(),
  };
})(CompanyProfile);
