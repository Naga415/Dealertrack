'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Waiting extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id={this.props.htmlId} className="waiting">
        <div className="waiting__header">
          Waiting for acceptance or counter offer.
        </div>
        <div>
          You have not received an acceptance or counter offer. It will appear here once you receive information.
        </div>
      </div>
    );
  }
}

Waiting.propTypes = {
  htmlId: PropTypes.string.isRequired
};
  
export default Waiting;
