import React from 'react';
import { Header, Card, Container, Segment, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Companies } from '../../api/company/Companies';
import { CompanyTags } from '../../api/tags/CompanyTags';
import Company from '../components/Company';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const makeSchema = (allInterests) => new SimpleSchema({
  name: { type: Array, label: '', optional: true },
  'name.$': { type: String, allowedValues: allInterests },
});

function getProfile(owner) {
  return Companies.collection.findOne({ owner });
}

/** Renders card containing all of the Company and Tags documents. */
class ViewCompanyMatches extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.name || [] });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const allInterests = _.uniq(_.pluck(CompanyTags.collection.find().fetch(), 'name'));
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const companyEmails = _.pluck(CompanyTags.collection.find({ name: { $in: this.state.interests } }).fetch(), 'owner');
    const companyMatches = _.uniq(companyEmails).map(email => getProfile(email));
    return (
      <Container id='view-company-matches-page'>
        <Header style={ { fontSize: 'xx-large' } } className='cp-text' textAlign='center'>Filter By Interest</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <MultiSelectField id='name' name='name' showInlineError={true} placeholder={'Search by interests...'}/>
            <SubmitField value='Submit'/>
          </Segment>
        </AutoForm>
        {_.size(companyMatches) > 0 ? (
          <Header style={ { fontSize: 'xx-large' } } className='cp-text' textAlign='center'>Interested Matches!</Header>
        ) : ''}
        <Card.Group itemsPerRow={4}>
          {companyMatches.map((company, index) => <Company
            key={index}
            company={company}
            tags={this.props.tags.filter(tag => (tag.owner === company.owner))}
          />)}
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
  const subscription2 = Meteor.subscribe(CompanyTags.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Companies documents
  const companies = Companies.collection.find({}).fetch();
  const tags = CompanyTags.collection.find({}).fetch();
  return {
    companies,
    tags,
    ready,
  };
})(ViewCompanyMatches);
