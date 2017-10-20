'use strict';
import React from 'react';
import Tab from '../../../molecules/Tab/Tab';
import TabContent from '../../../molecules/Tab/TabContent';
import PropTypes from 'prop-types';
import Finance from './Inputs/Finance';
import Lease from './Inputs/Lease';
import Balloon from './Inputs/Balloon';
import Cash from './Inputs/Cash';
import * as ScenarioTypes from '../../../../../../models/ScenarioTypes';

// eslint-disable-next-line react/prefer-stateless-function
export class DealTypeSelectorClass extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }


  onTabSelect = (scenarioType) => {
    const { dealId, scenario } = this.props;
    this.props.actions.deal.updateScenarioTypeAsync(dealId, scenarioType, scenario);
  }

  onSaveScenario = () => {
    const { dealId, scenario } = this.props;
    this.props.actions.deal.updateScenarioAsync(dealId, scenario);
  }

  render() {
    return (
      <Tab htmlId={this.props.htmlId} onTabSelect={this.onTabSelect} selectedValue={this.props.scenario.type}>
        <TabContent htmlId={`${this.props.htmlId}-Finance`} label={ScenarioTypes.FINANCE}>
          <Finance scenario={this.props.scenario} actions={this.props.actions} save={this.onSaveScenario} />
        </TabContent>
        <TabContent htmlId={`${this.props.htmlId}-Lease`} label={ScenarioTypes.LEASE}>
          <Lease scenario={this.props.scenario} actions={this.props.actions} save={this.onSaveScenario} />
        </TabContent>
        <TabContent htmlId={`${this.props.htmlId}-Cash`} label={ScenarioTypes.CASH}>
          <Cash scenario={this.props.scenario} actions={this.props.actions} save={this.onSaveScenario} />
        </TabContent>
        <TabContent htmlId={`${this.props.htmlId}-Balloon`} label={ScenarioTypes.BALLOON}>
          <Balloon scenario={this.props.scenario} actions={this.props.actions} save={this.onSaveScenario} />
        </TabContent>
      </Tab>
    );
  }
}

DealTypeSelectorClass.propTypes = {
  scenario: PropTypes.object.isRequired,
  htmlId: PropTypes.string.isRequired,
  dealId: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

export default DealTypeSelectorClass;
