'use strict';
export default class LeaseDetails {
  constructor() {
    this.msrp = null;
    this.sellingPrice = null;
    this.addOns = null;
    this.fees = null;
    this.taxes = null;
    this.rate = null;
    this.term = null;
    this.residual = null;
    this.downpayments = [];
    this.rebate = null;
    this.acquisitionFee = null;
    this.adjustedCapCost = null;
    this.milesPerYear = null;
    this.baseResidual = null;
    this.adjustedResidual = null;
    this.expectedMiles = null;
    this.amountPerMile = null;
    this.securityDeposit = null;
    this.paidByCustomer = null;
    this.grossCapCost = null;
    this.capCostReduction = null;
  }
}
