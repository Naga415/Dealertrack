import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import ProgramDetails from './ProgramDetails';
import * as ScenarioTypes from '../../../../../models/ScenarioTypes';
import Program from '../../../../../models/RatesAndResiduals/Program';
import Incentive from '../../../../../models/RatesAndResiduals/Incentive';

describe('<ProgramDetails>', () => {
  const onShowRRModal = sinon.spy();
  const selectedProgram = new Program();
  selectedProgram.id = 0;
  selectedProgram.type = ScenarioTypes.FINANCE;
  selectedProgram.acquisitionFee = 456;
  selectedProgram.amountFinanced = 40000;
  selectedProgram.backGross = 456;
  selectedProgram.expirationDate = '11/23/2020';
  selectedProgram.frontGross = 234;
  selectedProgram.lender = 'acd';
  selectedProgram.maxAdvance = 643;
  selectedProgram.payment = 900;
  selectedProgram.rebates = 1500;
  selectedProgram.term = 24;
  selectedProgram.rateMoneyFactor = 6.9;
  const militaryIncentive = new Incentive();
  militaryIncentive.id = 1;
  militaryIncentive.name = "Military Incentive";
  militaryIncentive.apr = '5.4';
  militaryIncentive.expirationDate = '12/05/2018';
  militaryIncentive.details = "Work hard, play harder";
  militaryIncentive.exclusions = [2];
  militaryIncentive.offer = 1234;
  const gradIncentive = new Incentive();
  gradIncentive.id = 2;
  gradIncentive.name = "Recent Grad Incentive";
  gradIncentive.apr = '5.4';
  gradIncentive.expirationDate = '12/05/2017';
  gradIncentive.details = "Work hard, play harder";
  gradIncentive.exclusions = [1, 3];
  gradIncentive.offer = 1234;
  const props = {
    htmlId: "ProgramDetails",
    selectedProgram,
    selectedIncentives: [militaryIncentive, gradIncentive],
    selectedLender: "Ally",
    onShowRRModal
  };

  it('renders <ProgramDetails/>', () => {
    const component = renderer.create(<ProgramDetails {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('it displays aggreate of the applied incentives', () => {
    const expected = "Applied Incentives   $2,468";
    const component = mount(<ProgramDetails {...props} />);
    expect(component.find('.program-details__incentives').text()).toContain(expected);
  });

  it('it invokes onShow when View Details is clicked', () => {
    const component = mount(<ProgramDetails {...props} />);
    component.find('#ViewDetailsLink').simulate('click');
    expect(onShowRRModal.calledOnce).toEqual(true);
  });
});

