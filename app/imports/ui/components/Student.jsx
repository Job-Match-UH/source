import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Student extends React.Component {
  render() {
    return (
      <Card as={NavLink} exact to="/studentprofile">
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.student.image}
          />
          <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
          <Card.Meta>{this.props.student.owner}</Card.Meta>
          <Card.Description>
            {this.props.student.about}
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
Student.propTypes = {
  student: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Student);
