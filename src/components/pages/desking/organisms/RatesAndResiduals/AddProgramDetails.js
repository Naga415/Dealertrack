'use strict';
import React from 'react';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class AddProgramDetails extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  showRRModal = () => {
    this.props.onShowRRModal(true);
  }

  render() {
    return (
      <div className="add-program-details">
        <div>
          <div>A Lender Program has not been selected for this deal</div>
          <Button
            htmlId="RRModalLink"
            className='add-program-details__modal_link'
            bsStyle="link"
            onClick={this.showRRModal}>Add Programs & Incentives</Button>
        </div>
      </div>
    );
  }
}

AddProgramDetails.propTypes = {
  onShowRRModal: PropTypes.func
};

export default AddProgramDetails;
