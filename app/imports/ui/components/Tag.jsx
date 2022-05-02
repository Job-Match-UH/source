import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Tag extends React.Component {
  render() {
    return (
      <Label color='blue'>
        {this.props.tag.name}
      </Label>
    );
  }
}

// Require a document to be passed to this component.
Tag.propTypes = {
  tag: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Tag);
