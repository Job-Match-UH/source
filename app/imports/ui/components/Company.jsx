import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Company extends React.Component {
  render() {
    return (
      <Card>
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
          {/* {this.props.tags.name} */}
          <Link to={`/companyprofile/${this.props.company._id}`}>View Profile</Link>
        </Card.Content>
      </Card>
    );
  }
}
// Require a document to be passed to this component.
Company.propTypes = {
  company: PropTypes.object.isRequired,
  // tags: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Company);
