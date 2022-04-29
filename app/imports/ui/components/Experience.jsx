import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Experience extends React.Component {
  render() {
    return (
      <Card className='cp-text'>
        <Card.Content>
          <Card.Header>
            {this.props.experiences.title}
          </Card.Header>
          <Card.Description>
            {this.props.experiences.type.type}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.company}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.role}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.description}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.exp_start.type}
          </Card.Description>
          <Card.Description>
            {this.props.experiences.exp_end.type}
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
