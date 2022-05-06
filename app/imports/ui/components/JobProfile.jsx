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
                <Item.Content>
                  <Item.Meta className='cp-text'>
                    <b>Job ID: </b>
                    <span>{this.props.job.jobID}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b>Salary: </b>
                    <span>${this.props.job.pay}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b>Salary Type: </b>
                    <span>{this.props.job.payType}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b>Job Type: </b>
                    <span>{this.props.job.type}</span>
                  </Item.Meta>

                  <Item.Meta className='cp-text'>
                    <b>Location: </b>
                    <span>{this.props.job.location}</span>
                  </Item.Meta>

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
