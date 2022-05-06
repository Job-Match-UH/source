import React from 'react';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/job/Jobs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Job extends React.Component {

  deleteJob() {
    const title = _.pluck(Jobs.collection.find({ _id: this.props.job._id }).fetch(), '_id');
    _.map(title, function (id) { Jobs.collection.remove({ _id: id }, true); });
    Jobs.collection.remove({ _id: Meteor.userId() });
  }

  render() {
    return (
      <Card>
        <Card.Content as={NavLink} exact to={`/jobdescription/${this.props.job._id}`}>
          <Card.Header>
            <Card.Content extra>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={10}>
                    {this.props.job.jobTitle}
                  </Grid.Column>
                  <Grid.Row>
                    {Roles.userIsInRole(Meteor.userId(), 'company') ? (
                      <Link to={`/editjob/${this.props.job._id}`}><Icon name='pencil'/></Link>
                    ) : ''}
                    {Roles.userIsInRole(Meteor.userId(), 'company') ? (
                      <Button icon color='blue' onClick={() => this.deleteJob()}>
                        <Icon name='trash alternate'/>
                      </Button>
                    ) : ''}
                  </Grid.Row>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card.Header>
          <Card.Meta>{this.props.job.location}</Card.Meta>
          <Card.Description>
            {this.props.job.jobDescription}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Job.propTypes = {
  job: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Job);
