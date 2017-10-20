'use strict';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Balloon from './Balloon';
import Scenario from '../../../../../../../models/Scenario';
import BalloonDetails from '../../../../../../../models/BalloonDetails';
import BalloonSummary from '../../../../../../../models/BalloonSummary';
import * as ScenarioTypes from '../../../../../../../models/ScenarioTypes';
import TradeDetails from '../../../../../../../models/TradeDetails';


const primaryScenario = () => {
  const tradeDetails = new TradeDetails();
  tradeDetails.allowance = 20000;
  tradeDetails.payoff = 30000;
  tradeDetails.acv = 40000;

  const balloonDetails = new BalloonDetails();
  balloonDetails.msrp = null;
  balloonDetails.sellingPrice = null;
  balloonDetails.addOns = null;
  balloonDetails.fees = null;
  balloonDetails.taxes = null;
  balloonDetails.lenderFee = null;
  balloonDetails.rebate = null;
  balloonDetails.rate = null;
  balloonDetails.term = null;
  balloonDetails.firstPayment = null;
  balloonDetails.downpayments = [];
  balloonDetails.Trade = tradeDetails;

  const balloonSummary = new BalloonSummary();
  balloonSummary.payment = 350;
  balloonSummary.amountFinanced = 38623;


  const scenario = new Scenario();
  scenario.type = ScenarioTypes.BALLOON;
  scenario.summary = balloonSummary;
  scenario.details = balloonDetails;
  return scenario;
};

const onDetailsChange = sinon.spy();
const onTradeChange = sinon.spy();
const onSave = sinon.spy();

function cleanUp() {
  onDetailsChange.reset();
  onTradeChange.reset();
  onSave.reset();
}

afterEach(() => {
  cleanUp();
});

describe('Balloon specs', () => {
  const props = {
    scenario: primaryScenario(),
    htmlId: "BalloonDeal",
    actions: {
      deal: {
        updateScenarioDetails: onDetailsChange,
        updateScenarioTrade: onTradeChange
      }
    },
    save: onSave
  };

  it('renders <Balloon />', () => {
    const component = renderer.create(<Balloon {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('triggers onChange, onSave events when details change', () => {
    const component = mount(<Balloon {...props} />);
    component.find('#MSRP').simulate('change');
    expect(onDetailsChange.calledOnce).toEqual(true);
    component.find('#MSRP').simulate('blur');
    expect(onSave.calledOnce).toEqual(true);
  });

  it('triggers onChange, onSave events when trade details change', () => {
    const component = mount(<Balloon {...props} />);
    component.find('#ACV').simulate('change');
    expect(onTradeChange.calledOnce).toEqual(true);
    component.find('#ACV').simulate('blur');
    expect(onSave.calledOnce).toEqual(true);
  });
});
