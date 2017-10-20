'use strict';
import * as ScenarioTypes from '../../models/ScenarioTypes';
import ObjectUtil from '../../utils/ObjectUtil';
import '../../models/FinanceSummary';

export default class ScenarioUpdater {
  static update(scenario){
    if (!scenario){
      return scenario;
    }

    switch (scenario.type){
      case ScenarioTypes.FINANCE:
        return this.updateFinance(scenario);
      case ScenarioTypes.CASH:
        return this.updateCash(scenario);
      case ScenarioTypes.LEASE:
        return this.updateLease(scenario);
      case ScenarioTypes.BALLOON:
        return this.updateBalloon(scenario);
    }
  }

  static updateFinance(scenario){
    const msrp=scenario.details.msrp;
    const sellingPrice =this.numOrDefault(scenario.details.sellingPrice,0);
    const addOns =this.numOrDefault(scenario.details.addOns,0);
    const fees=this.numOrDefault(scenario.details.fees,0);
    const taxes=this.numOrDefault(scenario.details.taxes,0);
    const lenderFee=this.numOrDefault(scenario.details.lenderFee,0);
    const rebate=this.numOrDefault(scenario.details.rebate,0);
    const rate=this.numOrDefault(scenario.details.rate,0);
    const term=this.numOrDefault(scenario.details.term,0);
    const trade = scenario.trade;
    const downpayment = this.numOrDefault(scenario.details.downpayments[0], 0);
    const amountFinanced = sellingPrice - rebate - downpayment;

    const updatedScenario = ObjectUtil.clone(scenario);
    updatedScenario.summary =ObjectUtil.clone(scenario.summary);
    updatedScenario.summary.amountFinanced = amountFinanced;
    updatedScenario.summary.amountDueAtSigning = amountFinanced * .5;
    updatedScenario.summary.balanceDue = taxes + fees + lenderFee - rebate - downpayment;
    updatedScenario.summary.holdDeposit = null;
    updatedScenario.summary.purchasePriceWithAdds = sellingPrice + addOns;
    updatedScenario.summary.discountFromSellingPrice = sellingPrice-msrp;
    updatedScenario.summary.netTrade = this.numOrDefault(trade.allowance,0) - this.numOrDefault(trade.payoff,0);
    updatedScenario.summary.interestRateTotal = null;
    updatedScenario.summary.totalPayments = term * 12;
    updatedScenario.summary.subtotal = sellingPrice + fees + addOns - rebate - downpayment;
    updatedScenario.summary.payment = this.getPayment(amountFinanced, rate, term);

    return updatedScenario;
  }

  static getPayment(principle, rate,term){
    try {
      const effectiveRate = ((rate/100)/12);
      const numberOfPayments = term * 12;
      return principle*(effectiveRate/(1-Math.pow((1+effectiveRate),(-1*numberOfPayments))));
    }
    catch (e){
      return 0;
    }
  }

  static updateCash(scenario){
    return scenario;
  }

  static updateLease(scenario){
    return scenario;
  }

  static updateBalloon(scenario){
    return scenario;
  }
  static numOrDefault(number, defaultNumber){
    return (number===0||(number&&!isNaN(number)))? parseFloat(number,10): defaultNumber;
  }
}
