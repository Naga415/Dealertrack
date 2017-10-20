import React from 'react';
import renderer from 'react-test-renderer';
import {DealTypeSelectorClass as DealTypeSelector} from './DealTypeSelector';
import TradeDetails from '../../../../../../models/TradeDetails';
import FinanceDetails from '../../../../../../models/FinanceDetails';
import FinanceSummary from '../../../../../../models/FinanceSummary';
import Scenario from '../../../../../../models/Scenario';
import * as ScenarioTypes from '../../../../../../models/ScenarioTypes';

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

describe('DealTypeSelector', () => {
  it('renders <DealTypeSelector />', () => {
    const props = {
      htmlId: "DealTypeSelector",
      dealId: 1,
      scenario: primaryScenario(),
      actions: {},
      updateScenario: () => { }
    };
    const component = renderer.create(<DealTypeSelector {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
