import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Projects } from '../../api/projects/Projects';

class Project extends React.Component {

  deleteProj() {
    const title = _.pluck(Projects.collection.find({ _id: this.props.project._id }).fetch(), '_id');
    _.map(title, function (id) { Projects.collection.remove({ _id: id }, true); });
    Projects.collection.remove({ _id: Meteor.userId() });
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
                    {this.props.project.name}
                  </Grid.Column>
                  <Grid.Row>
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Link to={`/editproject/${this.props.project._id}`}><Icon name='pencil'/></Link>
                    ) : ''}
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Icon name='trash alternate' color='blue' onClick={() => this.deleteProj()}/>
                    ) : ''}
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card.Header>
          <Card.Description>
            {this.props.project.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Project.propTypes = {
  project: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Project);
