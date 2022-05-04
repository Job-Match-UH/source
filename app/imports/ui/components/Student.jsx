import React from 'react';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Tag from './Tag';
import { Tags } from '../../api/tags/Tags';
import { Students } from '../../api/student/Student';
import { Education } from '../../api/education/Education';
import { Experiences } from '../../api/experience/Experience';
import { Projects } from '../../api/projects/Projects';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Student extends React.Component {

  deleteProfile(ID) {
    const owner = this.props.student.owner;
    // remove educations from EducationCollection
    const ownersEduById = _.pluck(Education.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersEduById, function (id) { Education.collection.remove({ _id: id }); });

    // remove experiences from ExperienceCollection
    const ownersExpsById = _.pluck(Experiences.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersExpsById, function (id) { Experiences.collection.remove({ _id: id }); });

    // remove projects from ProjectCollection
    const ownersProjectsById = _.pluck(Projects.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersProjectsById, function (id) { Projects.collection.remove({ _id: id }); });

    // remove tags from TagCollection
    const ownersTagsById = _.pluck(Tags.collection.find({ owner: owner }).fetch(), '_id');
    _.map(ownersTagsById, function (id) { Tags.collection.remove({ _id: id }); });

    // remove company from CompaniesCollection
    Students.collection.remove({ _id: ID });
  }

  render() {
    return (
      <Card>
        <Card.Content as={NavLink} exact to={`/viewstudent/${this.props.student._id}`}>
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
              <Button basic color='grey' as={NavLink} exact to={`/viewstudent/${this.props.student._id}`}>
              View
              </Button>
              <Button
                basic color='red'
                onClick={() => this.deleteProfile(this.props.student._id)}
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
Student.propTypes = {
  student: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Student);
