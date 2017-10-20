'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class AddTradeInDetails extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div id={this.props.htmlId} className="add-tradein-details">
        <div>
          <div>A Trade In has not been provided for this deal</div>
        </div>
      </div>
    );
  }
}

AddTradeInDetails.propTypes = {
  htmlId: PropTypes.string.isRequired
};

export default AddTradeInDetails;
