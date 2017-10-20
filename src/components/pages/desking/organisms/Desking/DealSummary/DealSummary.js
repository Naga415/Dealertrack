'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import FinancialSummaryModel from '../../../../../../models/FinanceSummary';
import LeaseSummaryModel from '../../../../../../models/LeaseSummary';
import CashSummaryModel from '../../../../../../models/CashSummary';
import BalloonSummaryModel from '../../../../../../models/BalloonSummary';
import FinanceSummary from './FinanceSummary';
import LeaseSummary from './LeaseSummary';
import CashSummary from './CashSummary';
import BalloonSummary from './BalloonSummary';

// eslint-disable-next-line react/prefer-stateless-function
export class DealSummaryClass extends React.PureComponent {
  render() {
    const summary = this.props.financialSummary;
    if (summary instanceof FinancialSummaryModel){
      return <FinanceSummary financialSummary={this.props.financialSummary}/>;
    }
    else if (summary instanceof LeaseSummaryModel){
      return <LeaseSummary financialSummary={this.props.financialSummary}/>;
    }
    else if (summary instanceof CashSummaryModel){
      return <CashSummary financialSummary={this.props.financialSummary}/>;
    }
    else if (summary instanceof BalloonSummaryModel){
      return <BalloonSummary financialSummary={this.props.financialSummary}/>;
    }
  }
}
DealSummaryClass.propTypes = {
  htmlId: PropTypes.string.isRequired,
  financialSummary: PropTypes.oneOfType([
    PropTypes.instanceOf(FinancialSummaryModel),
    PropTypes.instanceOf(LeaseSummaryModel),
    PropTypes.instanceOf(CashSummaryModel),
    PropTypes.instanceOf(BalloonSummaryModel)
  ])
};


export default DealSummaryClass;

