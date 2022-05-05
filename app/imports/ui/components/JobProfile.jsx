import React from 'react';
import { Container, Grid, Header, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Job extends React.Component {
  render() {
    return (
      <Container id='view-job-description'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={12}>
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column width={15}>
                    <Header as='h1' className='cp-text'>{this.props.job.jobTitle} </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Item>
                <Item.Description className='cp-text'>{this.props.job.jobID}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.pay}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.payType}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.type}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.location}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.jobDescription}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.qualifications}</Item.Description>
                <Item.Description className='cp-text'>{this.props.job.owner}</Item.Description>
              </Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
Job.propTypes = {
  job: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Job);
