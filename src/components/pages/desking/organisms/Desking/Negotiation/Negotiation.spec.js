/**
 * Created by RBANDERSON on 10/9/2017.
 */
import React from 'react';
import { shallow } from 'enzyme';
import { NegotiationClass as Negotiation } from './Negotiation';
import * as NegotiationStatus from '../../../../../../models/NegotiationStatus';
import SubmittedOffer from './SubmittedOffer';
import Scenario from '../../../../../../models/Scenario';
import TradeDetails from '../../../../../../models/TradeDetails';
import FinanceDetails from '../../../../../../models/FinanceDetails';
import FinanceSummary from '../../../../../../models/FinanceSummary';
import * as ScenarioTypes from '../../../../../../models/ScenarioTypes';
import Waiting from './Waiting';
import Congratulations from './Congratulations';

function setupmount(status) {
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
  const props = {
    htmlId: 'Negotiation',
    actions: {
      deal: {}
    },
    dealId: 0,
    scenario,
    status
  };
  return shallow(<Negotiation {...props} />);
}

describe('Negotiation Tests', () => {
  it('will render <SubmittedOffer /> in content', () => {
    const component = setupmount(NegotiationStatus.OFFER_IN_PROGRESS);
    expect(component.find(SubmittedOffer).length).toBe(1);
  });

  it('will render <Waiting /> in content', () => {
    const component = setupmount(NegotiationStatus.WAITING_FOR_RESPONSE);
    expect(component.find(Waiting).length).toBe(1);
  });

  it('will render <Congratulations /> in content', () => {
    const component = setupmount(NegotiationStatus.OFFER_ACCEPTED);
    expect(component.find(Congratulations).length).toBe(1);
  });
});
