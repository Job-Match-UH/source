import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
          <Card.Content extra>
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          {/* {this.props.tags.name} */}
          <div className='ui two buttons'>
            <Button basic color='green'>
              Add to Interested
            </Button>
            <Button basic color='red'>
              Not Interested
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
// Require a document to be passed to this component.
Company.propTypes = {
  company: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Company);
