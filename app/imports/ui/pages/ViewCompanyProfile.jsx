import React from 'react';
import { Header, Card, Container, Loader, Grid, Image, Item, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Job from '../components/Job';
import { Companies } from '../../api/company/Companies';
import { Jobs } from '../../api/job/Jobs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewCompanyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container id='company-profile-page'>
        <Grid className='cp-text'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image centered size='medium' src={this.props.company.image}/>
              <Button circular fluid className='cp-text'><a href={this.props.company.website}/>{this.props.company.website}</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' className='cp-text'>{this.props.company.companyName}</Header>
              <Item.Description>{this.props.company.description}</Item.Description>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item.Description>{this.props.company.address}</Item.Description>
              <Item.Description>{this.props.company.state}</Item.Description>
              <Item.Description>{this.props.company.phone}</Item.Description>
              <Item.Description>{this.props.company.year}</Item.Description>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}>
              <Card.Group centered>
                {this.props.job.map((job, index) => <Job
                  key={index}
                  job={job}/>)}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require the presence of a Company document in the props object. Uniforms adds 'model' to the props, which we use.
ViewCompanyProfile.propTypes = {
  company: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  job: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const companyId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  const ready = sub1.ready() && sub2.ready();
  // Get documents
  const company = Companies.collection.findOne(companyId);
  const job = Jobs.collection.find({ owner: company.owner });
  return {
    ready,
    company,
    job,
  };
})(ViewCompanyProfile);
