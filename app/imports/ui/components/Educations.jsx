import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link, withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Education } from '../../api/education/Education';

class Educations extends React.Component {

  deleteEdu() {
    const school = _.pluck(Education.collection.find({ _id: this.props.educations._id }).fetch(), '_id');
    _.map(school, function (id) { Education.collection.remove({ _id: id }, true); });
    Education.collection.remove({ _id: Meteor.userId() });
  }

  render() {
    return (
      <Card className='cp-text'>
        <Card.Content>
          <Card.Header>
            <Card.Content extra>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={13}>
                    {this.props.educations.school}
                  </Grid.Column>
                  <Grid.Row>
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Link to={`/editeducation/${this.props.educations._id}`}><Icon name='pencil'/></Link>
                    ) : ''}
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Icon name='trash alternate' color='blue' onClick={() => this.deleteEdu()}/>
                    ) : ''}
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card.Header>
          <Card.Description>
            {this.props.educations.degree.type}
            {this.props.educations.field}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Educations.propTypes = {
  educations: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Educations);
