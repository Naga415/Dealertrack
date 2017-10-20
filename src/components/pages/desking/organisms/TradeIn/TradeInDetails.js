'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TradeInDetails extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id={this.props.htmlId}>
        TODO
      </div>
    );
  }
}

TradeInDetails.propTypes = {
  htmlId: PropTypes.string.isRequired
};

export default TradeInDetails;
