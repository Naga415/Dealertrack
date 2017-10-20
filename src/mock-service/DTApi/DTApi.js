'use strict';
import JSApi from '../JSApi/JSApi';
import Route from '../JSApi/Route';
import * as RouteTypes from '../JSApi/RouteTypes';
import CustomerManager from '../managers/CustomerManager';
import DealManager from '../managers/DealManager';
import NegotiationManager from '../managers/NegotiationManager';

class DTApi extends JSApi{
  constructor() {
    super();
    this.delay = 0;
    this.dataIsPromise = true;
    this.routes = [
      new Route(RouteTypes.GET, 'deal/{dealId}', this.getDeal),
      new Route(RouteTypes.PUT, 'deal/{dealId}/scenario/{scenarioId}', this.updateScenario),
      new Route(RouteTypes.PUT, 'deal/{dealId}/scenario/{scenarioId}/type', this.updateScenarioType),
      new Route(RouteTypes.GET, 'customer/{leadId}', this.getCustomer),
      new Route(RouteTypes.GET, 'deal/{dealId}/scenario/{scenarioId}/profitbreakdown', this.getProfitBreakdown),
      new Route(RouteTypes.PUT, 'deal/{dealId}/negotiationstatus', this.updateNegotiationStatus),
      new Route(RouteTypes.GET, 'deal/{dealId}/negotiationstatus', this.getNegotiationStatus),
      new Route(RouteTypes.GET, 'deal/{dealId}/negotiationcounterscenario', this.getNegotiationCounterScenario)
    ];
  }

  getDeal(uri){
    const uriProperties = this.getURIProperties(uri);
    return DealManager.getDeal(uriProperties.dealId);
  }

  getCustomer(uri){
    const uriProperties = this.getURIProperties(uri);
    return CustomerManager.getCustomer(uriProperties.leadId);
  }

  updateScenario(uri, data) {
    return DealManager.updateDealScenario(data.scenario);
  }

  updateScenarioType(uri, data){
    return DealManager.updateScenarioType(data.newType, data.scenario);
  }

  getProfitBreakdown(uri){
    const uriProperties = this.getURIProperties(uri);
    return DealManager.getProfitBreakdown(uriProperties.dealId, uriProperties.scenarioId);
  }

  updateNegotiationStatus(uri, data){
    const {dealId} = this.getURIProperties(uri);
    return NegotiationManager.updateNegotiationStatus(dealId, data.status);
  }

  getNegotiationStatus(uri){
    const {dealId} = this.getURIProperties(uri);
    return NegotiationManager.getNegotiationStatus(dealId);
  }

  getNegotiationCounterScenario(uri){
    const {dealId} = this.getURIProperties(uri);
    return NegotiationManager.getNegotiationCounterScenario(dealId);
  }
}

export default new DTApi();
