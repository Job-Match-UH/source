import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { NavLink, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Tag from '../components/Tag';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';
import { Jobs } from '../../api/job/Jobs';

/** Renders a single Company card */
class Company extends React.Component {

  deleteProfile(ID) {
    const owner = this.props.company.owner;
    // remove jobs from JobCollection
    const ownersJobsById = _.pluck(Jobs.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersJobsById, function (id) { Jobs.collection.remove({ _id: id }); });
    // remove tags from TagCollection
    const ownersTagsById = _.pluck(Tags.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersTagsById, function (id) { Tags.collection.remove({ _id: id }); });
    // remove company from CompaniesCollection
    Companies.collection.remove({ _id: ID });
  }

  render() {
    return (
      <Card>
        <Card.Content as={NavLink} exact to={`/viewcompany/${this.props.company._id}`}>
          <Image
            floated='right'
            size='mini'
            src={this.props.company.image}
          />
          <Card.Header>
            {this.props.company.companyName}
          </Card.Header>
          <Card.Meta>{this.props.company.website}</Card.Meta>
          <Card.Description>
            {this.props.company.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {_.map(this.props.tags, (tag, index) => <Tag
            key={index}
            tag={tag}
          />)}
        </Card.Content>
        { Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='grey' as={NavLink} exact to={`/viewcompany/${this.props.company._id}`}>
                View
              </Button>
              <Button
                basic color='red'
                onClick={() => this.deleteProfile(this.props.company._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Content>
        ) : ''}
      </Card>
    );
  }
}
// Require a document to be passed to this component.
Company.propTypes = {
  company: PropTypes.object.isRequired,
  tags: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.

export default withRouter(Company);
