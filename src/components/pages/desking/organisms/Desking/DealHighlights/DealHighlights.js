'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import DealHighlight from './DealHighlight';
import FinanceSummary from '../../../../../../models/FinanceSummary';
import CashSummary from '../../../../../../models/CashSummary';
import BalloonSummary from '../../../../../../models/BalloonSummary';
import LeaseSummary from '../../../../../../models/LeaseSummary';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import GrossDetailsModal from './GrossDetailsModal';

// eslint-disable-next-line react/prefer-stateless-function
class DealHighLights extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { showGrossDetailsModal: false };
  }

  openCloseGrossDetailsModal = () => {
    this.setState(prevState => ({ showGrossDetailsModal: !prevState.showGrossDetailsModal }));
  }

  render() {
    const summary = this.props.summary;
    const counterSummary = this.props.counterSummary;
    const renderPayment = !(summary instanceof CashSummary);
    const renderAmountFinanced = (summary instanceof FinanceSummary || summary instanceof BalloonSummary);
    const renderAmountDue = (summary instanceof LeaseSummary);
    const renderBalanceDue = (summary instanceof CashSummary);
    const column = this.props.column || 2;
    return (
      <Grid htmlId={this.htmlId} className="deal-highlights">
        <Row className="show-grid" >
          {renderPayment && <Col xs={12 / column}>
            <DealHighlight htmlId={"PaymentHighlight"} paymentType="Payment" amount={summary.payment} counterAmount={counterSummary && counterSummary.payment} />
          </Col>}
          {renderAmountFinanced && <Col xs={12 / column}>
            <DealHighlight htmlId={"AmountFinancedHighlight"} paymentType="Amount Financed" amount={summary.amountFinanced} counterAmount={counterSummary && counterSummary.amountFinanced} />
          </Col>}
          {renderAmountDue && <Col xs={12 / column}>
            <DealHighlight htmlId={"AmountDueHighlight"} paymentType="Amount Due at Signing" amount={summary.amountDueAtSigning} counterAmount={counterSummary && counterSummary.amountDueAtSigning} />
          </Col>}
          {renderBalanceDue && <Col xs={12 / column}>
            <DealHighlight htmlId={"BalanceDueHighlight"} paymentType="Balance Due" amount={summary.balanceDue} counterAmount={counterSummary && counterSummary.balanceDue} />
          </Col>}
        </Row>
        <Row className="show-grid">
          <Col xs={12 / column}>
            {this.props.showGrossProfit && <DealHighlight htmlId={"FrontGrossHighlight"} paymentType="Front Gross" amount={summary.frontGross} onClick={this.openCloseGrossDetailsModal}
              counterAmount={counterSummary && counterSummary.frontGross} />}
          </Col>
          <Col xs={12 / column}>
            {this.props.showGrossProfit && <DealHighlight htmlId={"BackGrossHighlight"} paymentType="Back Gross" amount={summary.backGross} onClick={this.openCloseGrossDetailsModal}
              counterAmount={counterSummary && counterSummary.backGross} />}
          </Col>
        </Row>
        <GrossDetailsModal htmlId="GrossDetails" showActionDialog={this.state.showGrossDetailsModal} closeDialog={this.openCloseGrossDetailsModal} />
      </Grid >
    );
  }
}

DealHighLights.propTypes = {
  htmlId: PropTypes.string.isRequired,
  showGrossProfit: PropTypes.bool,
  summary: PropTypes.oneOfType([
    PropTypes.instanceOf(FinanceSummary),
    PropTypes.instanceOf(LeaseSummary),
    PropTypes.instanceOf(CashSummary),
    PropTypes.instanceOf(BalloonSummary)
  ]).isRequired,
  counterSummary: PropTypes.oneOfType([
    PropTypes.instanceOf(FinanceSummary),
    PropTypes.instanceOf(LeaseSummary),
    PropTypes.instanceOf(CashSummary),
    PropTypes.instanceOf(BalloonSummary)
  ]),
  column: PropTypes.number
};


export default DealHighLights;
