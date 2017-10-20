'use strict';
export default class CashDetail {
  constructor() {
    this.msrp = null;
    this.sellingPrice = null;
    this.addOns = null;
    this.fees = null;
    this.taxes = null;
    this.rebate = null;
    this.downpayments = [];
  }
}
