import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Job extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Card.Content extra>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={12}>
                    {this.props.job.jobTitle}
                  </Grid.Column>
                  <Grid.Column>
                    <Link to={`/editjob/${this.props.job._id}`}><Icon name='pencil'/></Link>
                  </Grid.Column>
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