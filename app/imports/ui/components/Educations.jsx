import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Educations extends React.Component {
  render() {
    return (
      <Card className='cp-text'>
        <Card.Content>
          <Card.Header>
            {this.props.educations.school}
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
