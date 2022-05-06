import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Card, Container, Segment, Loader, Button } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';
import Company from '../components/Company';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (allInterests) => new SimpleSchema({
  name: { type: Array, label: 'Interests', optional: true },
  'name.$': { type: String, allowedValues: allInterests },
});

function getProfile(email) {
  console.log(`what is email passed into getProfile? ${email}`);
  return Companies.collection.find({ owner: email });
}

/** Renders card containing all of the Company and Tags documents. */
class ViewCompanyMatches extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.interests || [] });
    console.log(`this is interests: ${this.state.interests}`);
  }

  // handleChange = (data) => {
  //   this.setState({ data });
  //   console.log(`this is interest: ${this.state.interests}`);
  // }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const allInterests = _.uniq(_.pluck(Tags.collection.find().fetch(), 'name'));
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const companyEmails = _.pluck(Tags.collection.find({ name: { $in: this.state.interests } }).fetch(), 'owner');
    const companyMatches = _.uniq(companyEmails).map(email => getProfile(email));
    return (
      <Container id='view-company-matches-page'>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <MultiSelectField id='name' name='name' onChange={data => this.submit(data)} showInlineError={true} placeholder={'Search by interests...'} fieldType='array'/>
            <SubmitField value='Submit'/>
            <Button onClick={this.handleClick}>Back</Button>
          </Segment>
        </AutoForm>
        <Header as='h2' className='cp-text' textAlign='center'>Interested Matches!</Header>
        <Card.Group itemsPerRow={4}>
          {_.map(companyMatches, (company, index) => <Company
            key={index}
            company={company}
            tags={this.props.tags.filter(tag => (tag.owner === company.owner))}
          />)}
          {/* {this.props.companies.map((company, index) => <Company */}
          {/*  key={index} */}
          {/*  company={company} */}
          {/*  tags={this.props.tags.filter(tag => (tag.owner === company.owner))} */}
          {/* />)} */}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Companies documents in the props.
ViewCompanyMatches.propTypes = {
  companies: PropTypes.array,
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to companies documents.
  const subscription = Meteor.subscribe(Companies.userPublicationName);
  // Get access to tags documents.
  const subscription2 = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Companies documents
  const companies = Companies.collection.find({}).fetch();
  const tags = Tags.collection.find({}).fetch();
  return {
    companies,
    tags,
    ready,
  };
})(ViewCompanyMatches);
