'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Summary from '../../../molecules/Summary/Summary';
import FinanceSummaryModel from '../../../../../../models/FinanceSummary';

// eslint-disable-next-line react/prefer-stateless-function
class FinanceSummary extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Summary title="Finance Deal" htmlId="FinanceSummary">
        <Summary.Item label="Hold Deposit" value={this.props.financialSummary.holdDeposit}/>
        <Summary.Item label="Purchase Price w/ Adds" value={this.props.financialSummary.purchasePriceWithAdds}/>
        <Summary.Item label="Discount from Selling Price" value={this.props.financialSummary.discountFromSellingPrice}/>
        <Summary.Item label="Net Trade" value={this.props.financialSummary.netTrade}/>
        <Summary.Item label="Interest Rate Total" value={this.props.financialSummary.interestRateTotal}/>
        <Summary.Item label="Total of Payments" value={this.props.financialSummary.totalPayments}/>
      </Summary>
    );
  }
}

FinanceSummary.propTypes = {
  financialSummary: PropTypes.instanceOf(FinanceSummaryModel)
};

export default FinanceSummary;

