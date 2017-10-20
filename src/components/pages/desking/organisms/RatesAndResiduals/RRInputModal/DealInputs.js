'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import NumericInput from '@coxautokc/fusion-ui-components/lib/NumericInput';

// eslint-disable-next-line react/prefer-stateless-function
class DealInputs extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Grid className="rr-input-modal__deal-inputs">
        <Row>
          <Col xs={2}>
            <NumericInput
              htmlId="RRCreditScoreInput"
              label="Credit Score"
              name="creditScore"
              onChange={this.props.updateDealInputs}
              value={this.props.creditScore || ''}/>
          </Col>
          <Col xs={2}>
            <NumericInput
              htmlId="RRSellingPriceInput"
              label="Selling Price"
              name="sellingPrice"
              onChange={this.props.updateDealInputs}
              value={this.props.sellingPrice || ''}/>
          </Col>
          <Col xs={2}>
            <NumericInput
              htmlId="RRDownPaymentInput"
              label="Down Payment"
              name="downpayment"
              onChange={this.props.updateDealInputs}
              value={this.props.downpayment || ''}/>
          </Col>
          <Col xs={2}>
            <NumericInput
              htmlId="RRTradeAllowanceInput"
              label="Trade Allowance"
              name="tradeAllowance"
              onChange={this.props.updateDealInputs}
              value={this.props.tradeAllowance || ''}/>
          </Col>
          <Col xs={2}>
            <NumericInput
              htmlId="RRTradePayoffInput"
              label="Trade Payoff"
              name="tradePayoff"
              onChange={this.props.updateDealInputs}
              value={this.props.tradePayoff || ''}/>
          </Col>
          <Col xs={2}>
            <NumericInput
              htmlId="RRTradeACVInput"
              label="Trade ACV"
              name="tradeACV"
              onChange={this.props.updateDealInputs}
              value={this.props.tradeACV || ''}/>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <NumericInput
              htmlId="RRZipCodeInput"
              label="Zip Code"
              name="zipCode"
              onChange={this.props.updateDealInputs}
              value={this.props.zipCode || ''}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DealInputs.propTypes = {
  creditScore: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  zipCode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  sellingPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  downpayment:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  tradeAllowance:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  tradePayoff: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  tradeACV: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  updateDealInputs: PropTypes.func
};

export default DealInputs;
