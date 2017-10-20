'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import * as NegotiationStatus from '../../../../../../models/NegotiationStatus';
import Scenario from '../../../../../../models/Scenario';
import Waiting from './Waiting';
import Congratulations from './Congratulations';
import * as DealActions from '../../../../../../actions/dealActions';
import Offer from './Offer/Offer';

export class NegotiationClass extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.timer = setInterval(this.checkOfferStatus, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  checkOfferStatus = () => {
    this.props.actions.deal.getNegotiationStatusAsync(this.props.dealId);
  }

  getBorderStyle = () => {
    switch (this.props.status) {
      case NegotiationStatus.WAITING_FOR_RESPONSE:
        return "border--state-submitted";
      default:
        return "";
    }
  }

  render() {
    const { htmlId, dealId, actions, status, scenario, counterScenario, acceptOffer, counterOffer } = this.props;
    const submittedOfferComponent = <Offer htmlId="submittedoffer" scenario={scenario} dealId={dealId} actions={actions} status={status} />;
    const counterofferComponent = <Offer htmlId="counterOffer" scenario={scenario} dealId={dealId} actions={actions} status={status} sendCounterOffer={true} save={counterOffer} />;
    const acceptOfferComponent = <Offer htmlId="acceptOffer" scenario={scenario} counterScenario={counterScenario} dealId={dealId} actions={actions} acceptOffer={acceptOffer} status={status} />;
    return (
      <Row id={htmlId} className="negotiation row-eq-height">
        <Col xs={6} className="negotiation__left-col row-eq-height">
          <div className={`${this.getBorderStyle()}`}>
            <Row>
              <Col xs={12}>
                {(status === NegotiationStatus.WAITING_FOR_RESPONSE || status === NegotiationStatus.OFFER_ACCEPTED) && submittedOfferComponent}
                {status === NegotiationStatus.COUNTER_OFFER_RECEIVED && counterofferComponent}
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={6} className="negotiation__right-col row-eq-height">
          <div>
            <Row>
              <Col xs={12}>
                {status === NegotiationStatus.WAITING_FOR_RESPONSE && <Waiting htmlId="Waiting" />}
                {status === NegotiationStatus.COUNTER_OFFER_RECEIVED && acceptOfferComponent}
                {status === NegotiationStatus.OFFER_ACCEPTED && <Congratulations htmlId="Congratulations" />}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.deal.negotiationStatus,
    scenario: state.deal.primaryScenario,
    dealId: state.deal.id,
    counterScenario: state.deal.counterScenario
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deal: bindActionCreators(DealActions, dispatch)
    }
  };
}

NegotiationClass.propTypes = {
  htmlId: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.keys(NegotiationStatus)),
  scenario: PropTypes.instanceOf(Scenario).isRequired,
  counterScenario: PropTypes.instanceOf(Scenario),
  dealId: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    deal: PropTypes.object
  }),
  acceptOffer: PropTypes.func,
  counterOffer: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NegotiationClass);
