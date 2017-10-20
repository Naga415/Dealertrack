'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@coxautokc/fusion-ui-components/lib/Card';
import Scenario from '../../../../../models/Scenario';
import AddTradeInDetails from './AddTradeInDetails';
import TradeInDetails from './TradeInDetails';

// eslint-disable-next-line react/prefer-stateless-function
export class TradeInClass extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const showTradeIn = (this.props.scenario && this.props.scenario.trade);
    return (
      <Card
        htmlId="TradeInCard"
        header="TRADE IN">
        {showTradeIn?<TradeInDetails htmlId="TradeInDetails"/>:<AddTradeInDetails htmlId="AddTradeInDetails"/>}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    scenario: state.deal.primaryScenario
  };
}

TradeInClass.propTypes = {
  htmlId: PropTypes.string,
  scenario: PropTypes.instanceOf(Scenario)
};

export default connect(
  mapStateToProps
)(TradeInClass);
