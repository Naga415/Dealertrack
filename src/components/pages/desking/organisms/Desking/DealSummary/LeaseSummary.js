'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Summary from '../../../molecules/Summary/Summary';
import LeaseSummaryModel from '../../../../../../models/LeaseSummary';

// eslint-disable-next-line react/prefer-stateless-function
class LeaseSummary extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Summary title="Lease Deal" htmlId="LeaseSummary">
        <Summary.Item label="Hold Deposit" value={this.props.financialSummary.holdDeposit}/>
        <Summary.Item label="Purchase Price w/ Adds" value={this.props.financialSummary.purchasePriceWithAdds}/>
        <Summary.Item label="Discount from Selling Price" value={this.props.financialSummary.discountFromSellingPrice}/>
        <Summary.Item label="Net Trade" value={this.props.financialSummary.netTrade}/>
        <Summary.Item label="Depreciation" value={this.props.financialSummary.depreciation}/>
        <Summary.Item label="Rent Charge Total" value={this.props.financialSummary.rentChargeTotal}/>
        <Summary.Item label="Base Monthly Payment" value={this.props.financialSummary.baseMonthlyPayment}/>
        <Summary.Item label="Days to 1st Payment" value={this.props.financialSummary.daysToFirstPayment}/>
        <Summary.Item label="Total Interest Paid" value={this.props.financialSummary.totalInterestPaid}/>
        <Summary.Item label="Total of Payments" value={this.props.financialSummary.totalOfPayments}/>
      </Summary>
    );
  }
}

LeaseSummary.propTypes = {
  financialSummary: PropTypes.instanceOf(LeaseSummaryModel)
};

export default LeaseSummary;

