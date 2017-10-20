'use strict';

export default class FinanceDetails {
  constructor() {
    this.msrp = null;
    this.sellingPrice = null;
    this.addOns = null;
    this.fees = null;
    this.taxes = null;
    this.lenderFee = null;
    this.rebate = null;
    this.rate = null;
    this.term = null;
    this.firstPayment = null;
    this.downpayments = [];
  }
}
