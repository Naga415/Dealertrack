'use strict';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import ProgramsTable from './ProgramsTable';
import Program from '../../../../../../models/RatesAndResiduals/Program';
import * as ScenarioTypes from '../../../../../../models/ScenarioTypes';

const financeProgram = new Program();
financeProgram.id = 0;
financeProgram.type = ScenarioTypes.FINANCE;
financeProgram.acquisitionFee = 456;
financeProgram.amountFinanced = 40000;
financeProgram.backGross = 456;
financeProgram.expirationDate = '11/23/2020';
financeProgram.frontGross = 234;
financeProgram.lender = 'acd';
financeProgram.maxAdvance = 643;
financeProgram.payment = 900;
financeProgram.rebates =1500;
financeProgram.term = 24;
financeProgram.rateMoneyFactor = 6.9;

const balloonProgram = new Program();
balloonProgram.id = 1;
balloonProgram.type = ScenarioTypes.BALLOON;
balloonProgram.acquisitionFee = 456;
balloonProgram.amountFinanced = 40000;
balloonProgram.backGross = 456;
balloonProgram.expirationDate = '11/23/2018';
balloonProgram.frontGross = 234;
balloonProgram.lender = 'acd';
balloonProgram.maxAdvance = 643;
balloonProgram.payment = 480;
balloonProgram.rebates =0;
balloonProgram.term = 60;
balloonProgram.rateMoneyFactor = 6.9;

const leaseProgram = new Program();
leaseProgram.id = 2;
leaseProgram.type = ScenarioTypes.LEASE;
leaseProgram.acquisitionFee = 456;
leaseProgram.amountFinanced = 40000;
leaseProgram.backGross = 456;
leaseProgram.expirationDate = '11/23/2018';
leaseProgram.frontGross = 234;
leaseProgram.lender = 'acd';
leaseProgram.maxAdvance = 643;
leaseProgram.payment = 552;
leaseProgram.rebates =0;
leaseProgram.term = 60;
leaseProgram.rateMoneyFactor = .0035;
leaseProgram.milesPerYear = 10000;
leaseProgram.residual= .45;


const lenders = ['UMB', 'Ally'];
const programs = [financeProgram, balloonProgram, leaseProgram];
const selectedProgram = financeProgram;

const setSelectedProgram = sinon.spy();

function setupProps(lenders, programs, selectedProgram){
  return {
    lenders,
    programs,
    selectedProgram,
    setSelectedProgram
  };
}

function setupmount (lenders, programs, selectedProgram) {
  const props = setupProps(lenders, programs, selectedProgram);
  return mount(<ProgramsTable {...props} />);
}

describe('ProgramsTable', ()=>{
  it('renders <ProgramsTable/> ', () => {
    const props = setupProps(lenders, programs, selectedProgram);
    const component = renderer.create(<ProgramsTable {...props}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render <ProgramsTable/> component with 0 programs selected', () => {
    const component = setupmount(lenders, programs);
    expect(component.find({type:'radio',checked:true}).length).toBe(0);
  });

  it('should render <ProgramsTable/> component with 1 selected program', () => {
    const component = setupmount(lenders, programs, selectedProgram);
    expect(component.find({type:'radio',checked:true}).length).toBe(1);
  });

  it('triggers setSelectedProgram event when program radio is clicked', () => {
    const component = setupmount(lenders, programs);
    component.find(`#ProgramRadio${financeProgram.id}`).simulate('click');
    expect(setSelectedProgram.calledOnce).toEqual(true);
  });
});
