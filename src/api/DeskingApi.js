'use strict';
/*
uncomment to use actual api
import Api from './api';
 */
// this points to mock api
import Api from '../mock-service/DTApi/DTApi';
export default class DeskingApi {
  static getCustomer(leadId){
    return Api.get(`customer/${leadId}`);
  }

  static getDeal(dealId){
    return Api.get(`deal/${dealId}`);
  }

  static updateScenarioType(dealId, newType, scenario){
    return Api.put(`deal/${dealId}/scenario/${scenario.id}/type`, {dealId, newType, scenario});
  }

  static updateScenario(dealId, scenario){
    return Api.put(`deal/${dealId}/scenario/${scenario.id}`, {dealId, scenario});
  }

  static getProfitBreakdown(dealId, scenarioId){
    return Api.get(`deal/${dealId}/scenario/${scenarioId}/profitbreakdown`);
  }

  static setNegotiationStatus(dealId, status){
    return Api.put(`deal/${dealId}/negotiationstatus`,{status});
  }

  static getNegotiationStatus(dealId){
    return Api.get(`deal/${dealId}/negotiationstatus`);
  }

  static getCounterScenario(dealId){
    return Api.get(`deal/${dealId}/negotiationcounterscenario`);
  }
}
