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
            src='https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
          />
          <Card.Header>{this.props.company.companyName}</Card.Header>
          <Card.Meta>{this.props.company.website}</Card.Meta>
          <Card.Description>
            {this.props.company.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
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
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Company);
