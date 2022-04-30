import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Educations extends React.Component {
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
                  <Grid.Column>
                    <Link to={`/editeducation/${this.props.educations._id}`}><Icon name='pencil'/></Link>
                  </Grid.Column>
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
