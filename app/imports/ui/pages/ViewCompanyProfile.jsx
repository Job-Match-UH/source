import React from 'react';
import { Header, Card, Container, Loader, Grid, Image, Item, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Job from '../components/Job';
import { Companies } from '../../api/company/Companies';
import { Jobs } from '../../api/job/Jobs';
import Tag from '../components/Tag';
import { CompanyTags } from '../../api/tags/CompanyTags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewCompanyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const styling = { padding: '0px' };
    return (
      <Container id='view-company-profile'>
        <Grid className='cp-text'>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image centered size='medium' src={this.props.company.image}/>
              <Button circular primary fluid className='cp-text' style={{ padding: 10, marginTop: 10 }}><a href={this.props.company.website}/>{this.props.company.website}</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' className='cp-text' style={ { fontSize: 'xxx-large', padding: 0, marginBottom: 10 } }>{this.props.company.companyName}</Header>
              <Item.Description style={ { fontSize: 'large' } }>{this.props.company.description}</Item.Description>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item.Description style={ { fontSize: 'large' } }>{this.props.company.address}</Item.Description>
              <Item.Description style={ { fontSize: 'large' } }>{this.props.company.state}</Item.Description>
              <Item.Description style={ { fontSize: 'large' } }>{this.props.company.phone}</Item.Description>
              <Item.Description style={ { fontSize: 'large' } }>{this.props.company.year}</Item.Description>
              <Header as='h3' className='cp-text' style={styling}>Interests</Header>
              <Item.Description className='cp-text'>
                {this.props.tags.map((tags, index) => <Tag
                  key={index}
                  tag={tags}
                />)}
              </Item.Description>
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
  job: PropTypes.array.isRequired,
  tags: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const companyId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  const sub3 = Meteor.subscribe(CompanyTags.userPublicationName);
  // Get docuemnts for admin access
  const sub4 = Meteor.subscribe(Companies.adminPublicationName);
  const sub5 = Meteor.subscribe(Jobs.adminPublicationName);
  const sub6 = Meteor.subscribe(CompanyTags.adminPublicationName);
  const ready = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready();
  // Get documents
  const company = Companies.collection.findOne(companyId);
  const job = Jobs.collection.find({ owner: company.owner });
  const tags = CompanyTags.collection.find({ owner: company.owner });
  return {
    ready,
    company,
    job,
    tags,
  };
})(ViewCompanyProfile);
