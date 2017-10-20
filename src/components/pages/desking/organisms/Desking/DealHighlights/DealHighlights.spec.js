import React from 'react';
import { shallow } from 'enzyme';
import * as ScenarioTypes from '../../../../../../models/ScenarioTypes';
import DealHighLights from './DealHighlights';
import DealHighlight from './DealHighlight';
import Scenario from '../../../../../../models/Scenario';
import TradeDetails from '../../../../../../models/TradeDetails';
import FinanceDetails from '../../../../../../models/FinanceDetails';
import FinanceSummary from '../../../../../../models/FinanceSummary';



const primaryScenario = () => {
  const tradeDetails = new TradeDetails();
  tradeDetails.allowance = 20000;
  tradeDetails.payoff = 30000;
  tradeDetails.acv = 40000;

  const financeDetails = new FinanceDetails();
  financeDetails.msrp = null;
  financeDetails.sellingPrice = null;
  financeDetails.addOns = null;
  financeDetails.fees = null;
  financeDetails.taxes = null;
  financeDetails.lenderFee = null;
  financeDetails.rebate = null;
  financeDetails.rate = null;
  financeDetails.term = null;
  financeDetails.firstPayment = null;
  financeDetails.downpayments = [];
  financeDetails.Trade = tradeDetails;


  const financeSummary = new FinanceSummary();
  financeSummary.payment = 350;
  financeSummary.amountFinanced = 38623;
  financeSummary.frontGross = 1638;
  financeSummary.backGross = 1184;
  financeSummary.holdDeposit = null;
  financeSummary.purchasePriceWithAdds = 35221;
  financeSummary.discountFromSellingPrice = 1500;
  financeSummary.netTrade = null;
  financeSummary.interestRateTotal = null;
  financeSummary.totalPayments = 38623;
  financeSummary.subtotal = null;

  const scenario = new Scenario();
  scenario.type = ScenarioTypes.FINANCE;
  scenario.summary = financeSummary;
  scenario.details = financeDetails;
  return scenario;
};

function setupshallow(showGross) {
  const props = {
    htmlId:"DealHighlights",
    showGrossProfit: showGross,
    summary: primaryScenario().summary
  };
  return shallow(<DealHighLights {...props} />);
}

describe('DealHighlights', () => {
  // Default snapshot when default
  /*
  it('renders <DealHighLights />', () => {
    const component = renderer.create(<DealHighLights summary={primaryScenario().summary} hideGross={true} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  */
  // Coverage for all deal scenarios when Gross is visible
  it('should render 4 <DealHighlight /> Type = FINANCE', () => {
    const component = setupshallow(true);
    expect(component.find(DealHighlight).length).toBe(4);
  });

  it('should render 4 <DealHighlight /> Type = LEASE', () => {
    const component = setupshallow(true);
    expect(component.find(DealHighlight).length).toBe(4);
  });

  it('should render 3 <DealHighlight /> Type=CASH', () => {
    const component = setupshallow(true);
    expect(component.find(DealHighlight).length).toBe(4);
  });
  it('should render 4 <DealHighlight /> Type = BALLOON', () => {
    const component = setupshallow(true);
    expect(component.find(DealHighlight).length).toBe(4);
  });

  // Coverage for all deal scenarios when Gross is hidden
  it('should render 2 <DealHighlight /> when gross is hidden Type = FINANCE', () => {
    const component = setupshallow(false);
    expect(component.find(DealHighlight).length).toBe(2);
  });
  it('should render 2 <DealHighlight /> when gross is hidden Type=LEASE', () => {
    const component = setupshallow(false);
    expect(component.find(DealHighlight).length).toBe(2);
  });
  it('should render 1 <DealHighlight /> when gross is hidden Type=CASH', () => {
    const component = setupshallow(false);
    expect(component.find(DealHighlight).length).toBe(2);
  });
  it('should render 2 <DealHighlight /> when gross is hidden Type = BALLOON', () => {
    const component = setupshallow(false);
    expect(component.find(DealHighlight).length).toBe(2);
  });
});
