import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Scenario from '../../../../../models/Scenario';
import { TradeInClass as TradeIn } from './TradeIn';
import TradeDetails from '../../../../../models/TradeDetails';

describe('Trade In Card Tests', () => {
  const tradeDetails = new TradeDetails();
  tradeDetails.allowance = 20000;
  tradeDetails.payoff = 30000;
  tradeDetails.acv = 40000;

  const pScenario = new Scenario();
  pScenario.trade = tradeDetails;
  
  const htmlId = "TradeIn";
  const props = {
    htmlId,
    scenario: pScenario,
  };

  it('renders <TradeIn /> organism', () => {
    const component = renderer.create(<TradeIn {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('will render trade in content', () => {
    const component = mount(<TradeIn {...props} />);
    expect(component.find('#TradeInDetails').length).toBe(1);
  });

  it('will render add trade in content', () => {
    const props ={htmlId};
    const component = mount(<TradeIn {...props} />);
    expect(component.find('#AddTradeInDetails').length).toBe(1);
  });
});
