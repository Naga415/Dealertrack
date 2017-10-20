'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import { getCurrencyFormattedNumber } from '../../../../../utils/numberFormatter';

// eslint-disable-next-line react/prefer-stateless-function
class Item extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const value = this.props.value ? getCurrencyFormattedNumber(this.props.value) : "_";
    const labelId = this.props.label.replace(/\s/g, '');
    return (
      <Row className="show-grid deal-summary-item">
        <Col md={8}>
          <label className="deal-summary-item__label" id={`${labelId}-label`} htmlFor={`${this.props.label}`}>{this.props.label}</label>
        </Col>
        <Col md={4}>
          <label className="deal-summary-item__value" id={`${labelId}-value`} htmlFor={`${this.props.label}`}>{value}</label>
        </Col>
      </Row>
    );
  }
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number
};

export default Item;
