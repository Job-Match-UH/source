import React from 'react';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Tag from './Tag';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Student extends React.Component {
  render() {
    return (
      <Card as={NavLink} exact to={`/viewstudent/${this.props.student._id}`}>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.student.image}
          />
          <Card.Header>
            {this.props.student.firstName} {this.props.student.lastName}
          </Card.Header>
          <Card.Meta>{this.props.student.owner}</Card.Meta>
          <Card.Description>
            {this.props.student.about}
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
              <Button basic color='grey'>
              View
              </Button>
              <Button basic color='red'>
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
Student.propTypes = {
  student: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Student);
