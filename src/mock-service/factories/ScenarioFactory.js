'use strict';
import * as ScenarioTypes from '../../models/ScenarioTypes';
import Scenario from '../../models/Scenario';
import FinanceDetails from '../../models/FinanceDetails';
import FinanceSummary from '../../models/FinanceSummary';
import TradeDetails from '../../models/TradeDetails';
import LeaseSummary from '../../models/LeaseSummary';
import LeaseDetails from '../../models/LeaseDetails';
import CashSummary from '../../models/CashSummary';
import CashDetail from '../../models/CashDetail';
import BallonSummary from '../../models/BalloonSummary';
import BallonDetails from '../../models/BalloonDetails';

export default class ScenarioFactory {
  static updateScenarioType(newType, scenario) {
    if (newType === scenario.type) {
      return scenario;
    }

    switch (newType) {
      case ScenarioTypes.FINANCE:
        return this.updateScenarioToFinance(scenario);
      case ScenarioTypes.LEASE:
        return this.updateScenarioToLease(scenario);
      case ScenarioTypes.CASH:
        return this.updateScenarioToCash(scenario);
      case ScenarioTypes.BALLOON:
        return this.updateScenarioToBalloon(scenario);
      default:
        return scenario;
    }
  }

  static updateScenarioToFinance(scenario) {
    const newScenario = new Scenario();
    newScenario.id = scenario.id;
    newScenario.type = ScenarioTypes.FINANCE;
    newScenario.summary = this.createFinanceSummary(scenario.summary);
    newScenario.details = this.createFinanceDetails(scenario.details);
    return newScenario;
  }
  static createFinanceSummary(scenarioSummary) {
    const summary = new FinanceSummary();
    if (!scenarioSummary) {
      return summary;
    }

    summary.payment = scenarioSummary.payment;
    summary.amountFinanced = scenarioSummary.amountFinanced;
    summary.amountDueAtSigning = scenarioSummary.amountDueAtSigning;
    summary.balanceDue = scenarioSummary.balanceDue;
    summary.holdDeposit = scenarioSummary.holdDeposit;
    summary.purchasePriceWithAdds = scenarioSummary.purchasePriceWithAdds;
    summary.discountFromSellingPrice = scenarioSummary.discountFromSellingPrice;
    summary.netTrade = scenarioSummary.netTrade;
    summary.interestRateTotal = scenarioSummary.interestRateTotal;
    summary.totalPayments = scenarioSummary.totalPayments;
    summary.subtotal = scenarioSummary.subtotal;
    return summary;
  }

  static createFinanceDetails(scenarioDetails) {
    const details = new FinanceDetails();
    if (!scenarioDetails) {
      return details;
    }

    details.msrp = scenarioDetails.msrp;
    details.sellingPrice = scenarioDetails.sellingPrice;
    details.addOns = scenarioDetails.addOns;
    details.fees = scenarioDetails.fees;
    details.taxes = scenarioDetails.taxes;
    details.lenderFee = scenarioDetails.lenderFee;
    details.rebate = scenarioDetails.rebate;
    details.rate = scenarioDetails.rate;
    details.term = scenarioDetails.term;
    details.firstPayment = scenarioDetails.firstPayment;
    details.downpayments = scenarioDetails.downpayments || [];
    details.Trade = scenarioDetails.Trade || new TradeDetails();
    return details;
  }



  static updateScenarioToLease(scenario) {
    const newScenario = new Scenario();
    newScenario.id = scenario.id;
    newScenario.type = ScenarioTypes.LEASE;
    newScenario.summary = this.createLeaseSummary(scenario.summary);
    newScenario.details = this.createLeaseDetails(scenario.details);

    return newScenario;
  }

  static createLeaseSummary(scenarioSummary) {
    const summary = new LeaseSummary();
    if (!scenarioSummary)
      return summary;

    summary.payment = scenarioSummary.payment;
    summary.amountDueAtSigning = scenarioSummary.amountDueAtSigning;
    summary.frontGross = scenarioSummary.frontGross;
    summary.backGross = scenarioSummary.backGross;
    return summary;
  }
  static createLeaseDetails(scenarioDetails) {
    const details = new LeaseDetails();
    if (!scenarioDetails)
      return details;

    details.msrp = scenarioDetails.msrp;
    details.sellingPrice = scenarioDetails.sellingPrice;
    details.addOns = scenarioDetails.addOns;
    details.fees = scenarioDetails.fees;
    details.taxes = scenarioDetails.taxes;
    details.rate = scenarioDetails.rate;
    details.term = scenarioDetails.term;
    details.residual = scenarioDetails.residual;
    details.downpayments = scenarioDetails.downpayments;
    details.rebate = scenarioDetails.rebate;
    details.acquisitionFee = scenarioDetails.acquisitionFee;
    details.adjustedCapCost = scenarioDetails.adjustedCapCost;
    details.milesPerYear = scenarioDetails.milesPerYear;
    details.baseResidual = scenarioDetails.baseResidual;
    details.adjustedResidual = scenarioDetails.adjustedResidual;
    details.expectedMiles = scenarioDetails.expectedMiles;
    details.amountPerMile = scenarioDetails.amountPerMile;
    details.securityDeposit = scenarioDetails.securityDeposit;
    details.paidByCustomer = scenarioDetails.paidByCustomer;
    details.grossCapCost = scenarioDetails.grossCapCost;
    details.capCostReduction = scenarioDetails.capCostReduction;
    return details;
  }

  static updateScenarioToCash(scenario) {
    const newScenario = new Scenario();
    newScenario.id = scenario.id;
    newScenario.type = ScenarioTypes.CASH;
    newScenario.summary = this.createCashSummary(scenario.summary);
    newScenario.details = this.createCashDetails(scenario.details);
    return newScenario;
  }

  static createCashSummary(scenarioSummary) {
    const summary = new CashSummary();
    if (!scenarioSummary)
      return summary;

    summary.balanceDue = scenarioSummary.balanceDue;
    summary.frontGross = scenarioSummary.frontGross;
    summary.backGross = scenarioSummary.backGross;
    return summary;
  }

  static createCashDetails(scenarioDetails) {
    const details = new CashDetail();
    if (!scenarioDetails) {
      return details;
    }

    details.msrp = scenarioDetails.msrp;
    details.sellingPrice = scenarioDetails.sellingPrice;
    details.addOns = scenarioDetails.addOns;
    details.fees = scenarioDetails.fees;
    details.taxes = scenarioDetails.taxes;
    details.rebate = scenarioDetails.rebate;
    details.downpayments = scenarioDetails.downpayments || [];
    details.Trade = scenarioDetails.Trade || new TradeDetails();
    return details;
  }

  static createBalloonSummary(scenarioSummary) {
    const summary = new BallonSummary();
    if (!scenarioSummary)
      return summary;

    summary.payment = scenarioSummary.payment;
    summary.amountFinanced = scenarioSummary.amountFinanced;
    return summary;
  }

  static createBalloonDetails(scenarioDetails) {
    const details = new BallonDetails();
    if (!scenarioDetails) {
      return details;
    }

    details.msrp = scenarioDetails.msrp;
    details.sellingPrice = scenarioDetails.sellingPrice;
    details.addOns = scenarioDetails.addOns;
    details.fees = scenarioDetails.fees;
    details.taxes = scenarioDetails.taxes;
    details.rebate = scenarioDetails.rebate;
    details.rate = scenarioDetails.rate;
    details.term = scenarioDetails.term;
    details.firstPayment = scenarioDetails.firstPayment;
    details.downpayments = scenarioDetails.downpayments || [];
    details.lenderFee = scenarioDetails.lenderFee;
    details.Trade = scenarioDetails.Trade || new TradeDetails();
    return details;
  }

  static updateScenarioToBalloon(scenario) {
    const newScenario = new Scenario();
    newScenario.id = scenario.id;
    newScenario.type = ScenarioTypes.BALLOON;
    newScenario.summary = this.createBalloonSummary(scenario.summary);
    newScenario.details = this.createBalloonDetails(scenario.details);
    return newScenario;
  }
}
