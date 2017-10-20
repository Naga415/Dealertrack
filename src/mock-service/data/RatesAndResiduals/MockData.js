/**
 * Created by RBANDERSON on 9/28/2017.
 */
import Incentive from '../../../models/RatesAndResiduals/Incentive';
import Program from '../../../models/RatesAndResiduals/Program';
import * as ScenarioTypes from '../../../models/ScenarioTypes';

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

const militaryIncentive = new Incentive();
militaryIncentive.id = 1;
militaryIncentive.name = "Military Incentive";
militaryIncentive.apr ='5.4';
militaryIncentive.expirationDate = '12/05/2018';
militaryIncentive.details = "Work hard, play harder";
militaryIncentive.exclusions =[2];
militaryIncentive.offer = 1234;

const gradIncentive = new Incentive();
gradIncentive.id = 2;
gradIncentive.name = "Recent Grad Incentive";
gradIncentive.apr ='5.4';
gradIncentive.expirationDate = '12/05/2017';
gradIncentive.details = "Work hard, play harder";
gradIncentive.exclusions =[1,3];
gradIncentive.offer = 1234;

const fridayIncentive = new Incentive();
fridayIncentive.id = 3;
fridayIncentive.name = "Friday Incentive";
fridayIncentive.apr ='5.4';
fridayIncentive.expirationDate = '11/05/2017';
fridayIncentive.details = "TGIF!!!";
fridayIncentive.exclusions =[];
fridayIncentive.offer = 1234;


class MockData {
  constructor(){
    this.lenders = ['UMB', 'Ally'];
    this.programs = [financeProgram, balloonProgram, leaseProgram];
    this.selectedProgram = financeProgram;
    this.incentives = [militaryIncentive, gradIncentive, fridayIncentive];
    this.selectedIncentives = [militaryIncentive];
  }
}

export default new MockData();
