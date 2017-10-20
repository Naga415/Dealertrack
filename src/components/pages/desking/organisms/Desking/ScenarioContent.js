'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DealHighlights from './DealHighlights/DealHighlights';
import DealSummary from './DealSummary/DealSummary';
import DealTypeSelector from './DealType/DealTypeSelector';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import * as DealActions from '../../../../../actions/dealActions';

// eslint-disable-next-line react/prefer-stateless-function
class ScenarioContent extends React.PureComponent {
  sendOffer = () => {
    this.props.sendOffer();
  };

  render() {
    const { scenario, showGrossProfit, actions, dealId } = this.props;
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} className="deal-detail-col">
            <DealHighlights htmlId="DealHighlights" summary={scenario.summary} showGrossProfit={showGrossProfit} />
            <DealTypeSelector htmlId="DealType" dealId={dealId} scenario={scenario} actions={actions} />
          </Col>
          <Col xs={4} className="deal-summary-col">
            <DealSummary htmlId="DealSummary" financialSummary={scenario.summary} />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} className="commands-col">
            <Button htmlId='buttonSendOffer' className="pull-right" buttonStyle='primary' onClick={this.props.sendOffer}>Send Offer</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ScenarioContent.propTypes = {
  sendOffer: PropTypes.func,
  scenario: PropTypes.object,
  showGrossProfit: PropTypes.bool,
  dealId: PropTypes.number,
  actions: PropTypes.shape({
    deal: PropTypes.object
  }
  )
};

function mapStateToProps(state) {
  return {
    scenario: state.deal.primaryScenario,
    dealId: state.deal.id,
    showGrossProfit: state.deal.showGrossProfit
  };
}

function mapDispathToProps(dispath) {
  return {
    actions: {
      deal: bindActionCreators(DealActions, dispath)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps)(ScenarioContent);

