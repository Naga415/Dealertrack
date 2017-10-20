import React from 'react';
import PropTypes from 'prop-types';
import * as ScenarioTypes from '../../../../../../../models/ScenarioTypes';
import ReadOnly from '../../../../molecules/ReadOnly/ReadOnly';
import SelectInput from '@coxautokc/fusion-ui-components/lib/SelectInput';
import * as FieldSettings from './FieldSettings';
import Scenario from '../../../../../../../models/Scenario';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import DealHighlights from '../../DealHighlights/DealHighlights';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import * as NegotiationStatus from '../../../../../../../models/NegotiationStatus';
import Input from '../../../../molecules/Input/Input';

const DealTypes = [{
  value: ScenarioTypes.FINANCE,
  label: ScenarioTypes.FINANCE
}, {
  value: ScenarioTypes.LEASE,
  label: ScenarioTypes.LEASE
}, {
  value: ScenarioTypes.CASH,
  label: ScenarioTypes.CASH
}, {
  value: ScenarioTypes.BALLOON,
  label: ScenarioTypes.BALLOON
}];

class Offer extends React.Component {
  constructor(props) {
    super(props);
  }

  onDealTypeChange = (event) => {
    const { dealId, scenario } = this.props;
    this.props.actions.deal.updateScenarioTypeAsync(dealId, event.target.value, scenario);
  }

  onDetailsChange = (event) => {
    const { name, value } = event.target;
    this.props.actions.deal.updateScenarioDetails(this.props.scenario.id, { name, value });
  }

  onTradeChange = (event) => {
    const { name, value } = event.target;
    this.props.actions.deal.updateScenarioTrade(this.props.scenario.id, { name, value });
  }

  onBlur = () => { }

  getClassName = (fieldName) => {
    if (this.props.status === NegotiationStatus.COUNTER_OFFER_RECEIVED) {
      const scenarioValue = this.props.scenario.details[fieldName];
      const counterValue = this.props.counterScenario.details[fieldName];
      if (scenarioValue && counterValue) {
        if (scenarioValue !== counterValue)
          return "label--state-different";
      }
    }
    return "";
  }

  readOnlyField = (item, index) => {
    return (
      <Col className={this.getClassName(item.name)}>
        <ReadOnly
          className={this.getClassName(item.name)}
          id={item.name}
          name={item.name}
          value={this.props.counterScenario.details[item.name]}
          label={item.label}
          readOnly={true}
          onClick={item.onClick}
          options={item.options}
          tabIndex={index} />
      </Col>
    );
  }

  editableField = (item, index, disabled, onTradeChange = null) => {
    return (
      <Col>
        <Input
          id={item.name}
          name={item.name}
          value={onTradeChange ? this.props.scenario.trade[item.name] : this.props.scenario.details[item.name]}
          label={item.label}
          onChange={onTradeChange || this.onDetailsChange}
          onBlur={this.onBlur}
          readOnly={disabled}
          onClick={item.onClick}
          options={item.options}
          tabIndex={index} />
      </Col>
    );
  }

  field = (item, index, onChange = null) => {
    const { status, sendCounterOffer } = this.props;
    if ((status === NegotiationStatus.WAITING_FOR_RESPONSE) || status === NegotiationStatus.OFFER_ACCEPTED)
      return this.editableField(item, index, true);
    else if (sendCounterOffer && (status === NegotiationStatus.COUNTER_OFFER_RECEIVED))
      return this.editableField(item, index, false, onChange);
    else
      return this.readOnlyField(item, index);
  }

  buildDealInputFields = (dealFields) => {
    return (
      dealFields.map((item, index) =>
        (<Row key={index}>
          {this.field(item, index)}
        </Row>)
      )
    );
  }

  buildCommonFields = () => {
    return (
      FieldSettings.Common.map((item, index) =>
        (<Row key={index}>
          {this.field(item, index)}
        </Row>)
      )
    );
  }

  buildTradeFields = () => {
    return (
      FieldSettings.Trade.map((item, index) =>
        (<Row key={index}>
          {this.field(item, index, this.onTradeChange)}
        </Row>)
      )
    );
  }

  getCommandButtons = () => {
    const { status, acceptOffer, save, sendCounterOffer } = this.props;

    if (status === NegotiationStatus.COUNTER_OFFER_RECEIVED && sendCounterOffer)
      return <Button htmlId='buttonSendCounterOffer' className="pull-right" buttonStyle='primary' onClick={save}>Send Offer</Button>;
    else if (status === NegotiationStatus.COUNTER_OFFER_RECEIVED)
      return <Button htmlId='buttonAcceptOffer' className="pull-right" buttonStyle='primary' onClick={acceptOffer}>Accept Offer</Button>;
    else
      return null;
  }

  render() {
    const { htmlId, scenario, counterScenario, sendCounterOffer, status } = this.props;
    return (
      <div id={htmlId} className="offer">
        <DealHighlights htmlId={`${status}DealHighlights`} column={1} summary={scenario.summary} showGrossProfit={true} counterSummary={counterScenario && counterScenario.summary} />
        <SelectInput
          className="offer__select-input"
          htmlId={`${status}DealTypeSelectInput`}
          name="DealTypeSelectInput"
          label=""
          onChange={this.onDealTypeChange}
          displayPlaceholder={false}
          value={scenario.type}
          disabled={!sendCounterOffer ? true : null}
          options={DealTypes}
        />
        <Grid className="offer__grid">
          {this.buildCommonFields()}
          {this.buildDealInputFields(FieldSettings.Finance)}
          {this.buildDealInputFields(FieldSettings.Lease)}
          {this.buildDealInputFields(FieldSettings.Balloon)}
          {this.buildTradeFields()}
        </Grid>
        {this.getCommandButtons()}
      </div>
    );
  };
}

Offer.defaultProps = {
  sendCounterOffer: false
};

Offer.propTypes = {
  htmlId: PropTypes.string.isRequired,
  scenario: PropTypes.instanceOf(Scenario).isRequired,
  counterScenario: PropTypes.instanceOf(Scenario),
  dealId: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  acceptOffer: PropTypes.func,
  sendCounterOffer: PropTypes.bool,
  status: PropTypes.oneOf(Object.keys(NegotiationStatus)),
  save: PropTypes.func
};

export default Offer;
