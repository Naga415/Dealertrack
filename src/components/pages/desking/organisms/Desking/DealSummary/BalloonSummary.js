'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Summary from '../../../molecules/Summary/Summary';
import BalloonSummaryModel from '../../../../../../models/BalloonSummary';

// eslint-disable-next-line react/prefer-stateless-function
class BalloonSummary extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Summary title="Balloon Deal" htmlId="BalloonSummary">
        <Summary.Item label="Hold Deposit" value={this.props.financialSummary.holdDeposit}/>
        <Summary.Item label="Purchase Price w/ Adds" value={this.props.financialSummary.purchasePriceWithAdds}/>
        <Summary.Item label="Discount from Selling Price" value={this.props.financialSummary.discountFromSellingPrice}/>
        <Summary.Item label="Net Trade" value={this.props.financialSummary.netTrade}/>
        <Summary.Item label="Balloon Amount" value={this.props.financialSummary.balloonAmount}/>
        <Summary.Item label="Interest Rate Total" value={this.props.financialSummary.interestRateTotal}/>
        <Summary.Item label="Total of Payments" value={this.props.financialSummary.totalPayments}/>
      </Summary>
    );
  }
}

BalloonSummary.propTypes = {
  financialSummary: PropTypes.instanceOf(BalloonSummaryModel)
};

export default BalloonSummary;
