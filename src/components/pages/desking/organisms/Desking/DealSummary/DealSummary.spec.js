import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import {DealSummaryClass as DealSummary} from './DealSummary';
import FinanceSummary from '../../../../../../models/FinanceSummary';
import CashSummary from '../../../../../../models/CashSummary';
import LeaseSummary from '../../../../../../models/LeaseSummary';
import BalloonSummary from '../../../../../../models/BalloonSummary';

describe('Deal Summary', () => {
  const financeSummary = new FinanceSummary();
  financeSummary.amountDueAtSigning = 2000;
  financeSummary.amountFinanced = 30000;
  financeSummary.payment = 550;
  financeSummary.discountFromSellingPrice = 4000;
  financeSummary.netTrade = 7000;
  financeSummary.interestRateTotal = 1500;
  financeSummary.totalPayments = 37000;

  const htmlId = "DealSummary";
  const financeProps = {
    htmlId,
    financialSummary: financeSummary
  };

  it('renders <DealSummary/> organism', () => {
    const component = renderer.create(<DealSummary {...financeProps} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders the correct amount for the summary items', () => {
    const component = mount(<DealSummary {...financeProps} />);
    expect(component.find('#NetTrade-value').text()).toEqual('$7,000');
    expect(component.find('#InterestRateTotal-value').text()).toEqual('$1,500');
    expect(component.find('#TotalofPayments-value').text()).toEqual('$37,000');
  });

  it('renders finance summary', () => {
    const component = mount(<DealSummary {...financeProps} />);
    expect(component.find('#FinanceSummary').length).toBe(1);
  });

  it('renders cash summary', () => {
    const financialSummary = new CashSummary();
    const props = {htmlId, financialSummary};
    const component = mount(<DealSummary {...props} />);
    expect(component.find('#CashSummary').length).toBe(1);
  });

  it('renders lease summary', () => {
    const financialSummary = new LeaseSummary();
    const props = {htmlId, financialSummary};
    const component = mount(<DealSummary {...props} />);
    expect(component.find('#LeaseSummary').length).toBe(1);
  });

  it('renders balloon summary', () => {
    const financialSummary = new BalloonSummary();
    const props = {htmlId, financialSummary};
    const component = mount(<DealSummary {...props} />);
    expect(component.find('#BalloonSummary').length).toBe(1);
  });
});

