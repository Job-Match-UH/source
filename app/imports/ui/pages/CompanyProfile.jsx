import React from 'react';
import { Container, Image, Grid, Header, Loader, Button, Card, Item, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Companies } from '../../api/company/Companies';
import { Jobs } from '../../api/job/Jobs';
import Job from '../components/Job';
import Tag from '../components/Tag';
import { CompanyTags } from '../../api/tags/CompanyTags';

export class CompanyProfile extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container id='company-profile'>
        <Grid className='cp-text' celled='internally'>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image centered size='medium' src={this.props.company.image}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={15}>
                    <Header as='h1' className='cp-text' style={ { fontSize: 'xxx-large', padding: 0, marginBottom: 10 } }>{this.props.company.companyName}</Header>
                  </Grid.Column>
                  <Grid.Column>
                    <Link to={`/editcompany/${this.props.company._id}`}><Icon size='large' name='pencil'/></Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Item>
                <Button circular primary className='cp-text' size='medium' style={{ padding: 10, marginTop: 10, marginBottom: 10, fontSize: 'larger', width: 200 }}><a href={this.props.company.website}/>Website</Button>
                <Header as='h3' className='cp-text' style={ { fontSize: 'large', margin: 0, paddingBottom: 15 } }>Contact Information</Header>
                <Item.Description style={ { fontSize: 'large' } }>{this.props.company.address}</Item.Description>
                <Item.Description style={ { fontSize: 'large' } }>{this.props.company.state}</Item.Description>
                <Item.Description style={ { fontSize: 'large' } }>{this.props.company.phone}</Item.Description>
                <Item.Description style={ { fontSize: 'large' } }>Established: {this.props.company.year}</Item.Description>
                <Header as='h3' className='cp-text' style={ { fontSize: 'large', margin: 0, marginTop: 20, paddingBottom: 15 } }>About the company</Header>
                <Item.Description style={ { fontSize: 'large', padding: 0 } }>{this.props.company.description}</Item.Description>
                <Header as='h3' className='cp-text' style={ { fontSize: 'large', paddingBottom: 5 } }>Interest</Header>
                <Item.Description className='cp-text'>
                  {this.props.tags.map((tags, index) => <Tag
                    key={index}
                    tag={tags}
                  />)}
                </Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={15}>
              <Header className='cp-text' style={ { fontSize: 'xx-large', padding: 0 } }>Posted Jobs</Header>
              { _.size(_.filter(Jobs.collection.find().fetch(), (job) => (job.owner === this.props.company.owner))) <= 0 ?
                (
                  <Header className='cp-text' style={ { fontSize: 'large', padding: 0 } }>No jobs posted</Header>
                ) : ''}
              <Card.Group centered={false} itemsPerRow={4}>
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
CompanyProfile.propTypes = {
  company: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  tags: PropTypes.array,
  job: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Companies.userPublicationName);
  const sub2 = Meteor.subscribe(Jobs.userPublicationName);
  const sub3 = Meteor.subscribe(CompanyTags.userPublicationName);
  // Get documents
  const email = Meteor.users.findOne(documentId).username;
  const company = Companies.collection.findOne({ owner: email });
  const job = Jobs.collection.find({}).fetch();
  const tags = CompanyTags.collection.find({ owner: company.owner });
  const ready = sub1.ready() && sub2.ready() && sub3.ready();

  return {
    ready,
    company,
    tags,
    job,
  };
})(CompanyProfile);
