'use strict';

export default class Deal {
  constructor() {
    this.id = 0;
    this.leadId = 0;
    this.primaryScenario = null;
    this.scenarios = [];
    this.showGrossProfit = true;
    this.negotiationStatus = null;
    this.counterScenario = null;
  }
}
