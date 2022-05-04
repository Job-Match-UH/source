import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Tag from '../components/Tag';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Company extends React.Component {
  render() {
    return (
      <Card as={NavLink} exact to={`/viewcompany/${this.props.company._id}`}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.company.image}
          />
          <Card.Header>{this.props.company.companyName}</Card.Header>
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
      </Card>
    );
  }
}
// Require a document to be passed to this component.
Company.propTypes = {
  company: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Company);
