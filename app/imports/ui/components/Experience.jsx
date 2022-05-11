import React from 'react';
import { Card, Icon, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link, withRouter } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Experiences } from '../../api/experience/Experience';

class Experience extends React.Component {

  deleteExp() {
    const title = _.pluck(Experiences.collection.find({ _id: this.props.experiences._id }).fetch(), '_id');
    _.map(title, function (id) { Experiences.collection.remove({ _id: id }, true); });
    Experiences.collection.remove({ _id: Meteor.userId() });
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
                    {this.props.experiences.title}
                  </Grid.Column>
                  <Grid.Row>
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Link to={`/editexperience/${this.props.experiences._id}`}><Icon name='pencil'/></Link>
                    ) : ''}
                    {Roles.userIsInRole(Meteor.userId(), 'student') ? (
                      <Icon name='trash alternate' color='blue' onClick={() => this.deleteExp()}/>
                    ) : ''}
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card.Header>
          <Card.Description>
            {this.props.experiences.type.type}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.company}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Experience.propTypes = {
  experiences: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Experience);
