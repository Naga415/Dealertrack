'use strict';
import TradeDetails from './TradeDetails';

export default class Scenario {
  constructor() {
    this.id = null;
    this.type = null;
    this.summary = null;
    this.details = null;
    this.trade = new TradeDetails();
    this.frontProfitBreakdown = [];
    this.backProfitBreakdown = [];
  }
}
