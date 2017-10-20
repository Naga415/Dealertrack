'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../../molecules/Card/Card';
import Loading from './Loading';
import ScenarioContent from './ScenarioContent';
import Header from './Header';
import * as DealActions from '../../../../../actions/dealActions';
import * as NegotiationStatus from '../../../../../models/NegotiationStatus';
import Negotiation from './Negotiation/Negotiation';

// eslint-disable-next-line react/prefer-stateless-function
class Desking extends React.PureComponent {
  sendOffer = () => {
    this.props.actions.deal.setNegotiationStatusAsync(0, NegotiationStatus.WAITING_FOR_RESPONSE);
  }
  acceptOffer = () => {
    this.props.actions.deal.setNegotiationStatusAsync(0, NegotiationStatus.OFFER_ACCEPTED);
  }
  getContent = () => {
    if (this.props.loading) {
      return <Loading />;
    }
    else if (this.props.negotiationStatus === NegotiationStatus.OFFER_IN_PROGRESS) {
      return <ScenarioContent sendOffer={this.sendOffer} />;
    }
    return <Negotiation htmlId="negotiation" acceptOffer={this.acceptOffer} counterOffer={this.sendOffer} />;
  }
  render() {
    return (
      <Card className="desking-card" htmlId="DeskingCard">
        <Card.Header>
          {this.props.loading ? <Loading /> : <Header showGrossProfit={this.props.showGrossProfit} updateGrossDisplayStatus={this.props.actions.deal.updateGrossDisplayStatus} />}
        </Card.Header>
        <Card.Content>
          {this.getContent()}
        </Card.Content>
      </Card>
    );
  }
}

Desking.propTypes = {
  loading: PropTypes.bool,
  actions: PropTypes.object,
  showGrossProfit: PropTypes.bool,
  negotiationStatus: PropTypes.oneOf(Object.keys(NegotiationStatus))
};

function mapStateToProps(state) {
  return {
    loading: state.loadingStatus,
    showGrossProfit: state.deal.showGrossProfit,
    negotiationStatus: state.deal.negotiationStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deal: bindActionCreators(DealActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desking);
