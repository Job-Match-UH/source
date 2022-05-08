import React from 'react';
import { Container, Grid, Header, Item, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Jobs } from '../../api/job/Jobs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewJobDescription extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container id='view-job-description'>
        <Grid celled='internally'>
          <Grid columns='equal'>
            <Grid.Row>
              <Header as='h1' className='cp-text' style={ { fontSize: 'xx-large' } }>{this.props.job.jobTitle}</Header>
            </Grid.Row>
            <Grid.Column width={8}>
              <Item>
                <Item.Content>
                  <Item.Meta className='cp-text'>
                    <b style={ { fontSize: 'large', paddingBottom: 50 } }>Job ID: </b>
                    <span>{this.props.job.jobID}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b style={ { fontSize: 'large' } }>Salary: </b>
                    <span>${this.props.job.pay}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b style={ { fontSize: 'large' } }>Salary Type: </b>
                    <span>{this.props.job.payType}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b style={ { fontSize: 'large' } }>Job Type: </b>
                    <span>{this.props.job.type}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b style={ { fontSize: 'large' } }>Location: </b>
                    <span>{this.props.job.location}</span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={8}>
              <Item>
                <Item.Content>
                  <Item.Meta className='cp-text'>
                    <b>Contact info: </b>
                    <span>{this.props.job.owner}</span>
                  </Item.Meta>

                  <Item.Meta as='h5' className='cp-text'>Description:</Item.Meta>
                  <Item.Description className='cp-text'>{this.props.job.jobDescription}</Item.Description>
                  <Item.Meta as='h5' className='cp-text'>Qualifications:</Item.Meta>
                  <Item.Description className='cp-text'>{this.props.job.qualifications}</Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Jobs documents in the props.
ViewJobDescription.propTypes = {
  job: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const jobId = match.params._id;
  // Get access to jobs documents.
  const subscription = Meteor.subscribe(Jobs.userPublicationName);
  // Determine if the subscriptions are ready
  const ready = subscription.ready();
  // Get the Jobs documents
  const job = Jobs.collection.findOne(jobId);
  return {
    job,
    ready,
  };
})(ViewJobDescription);
