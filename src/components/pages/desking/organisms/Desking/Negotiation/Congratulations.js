'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Congratulations extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id={this.props.htmlId} className="congratulations">
        <div className="congratulations__header">
          Congratulations!
        </div>
      </div>
    );
  }
}

Congratulations.propTypes = {
  htmlId: PropTypes.string.isRequired
};
  
export default Congratulations;
