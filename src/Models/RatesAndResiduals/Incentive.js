'use strict';
export default class Incentive {
  constructor() {
    this.id =null;
    this.name = "";
    this.expirationDate = null;
    this.offer = null;
    this.moneyFactor = null;
    this.apr = null;
    this.details = "";
    this.exclusions=[];
  }
}
