'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Button htmlId="RRModelCancel" onClick={this.props.onCancel}>Cancel</Button>
        <Button htmlId="RRModelApply" onClick={this.props.onApply} bsStyle="primary" disabled={!this.props.applyEnabled}>Apply</Button>
      </div>
    );
  }
}

Footer.propTypes = {
  onCancel: PropTypes.func,
  onApply: PropTypes.func,
  applyEnabled: PropTypes.bool
};

export default Footer;
