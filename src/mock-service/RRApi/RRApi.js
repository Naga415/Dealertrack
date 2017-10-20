'use strict';
import JSApi from '../JSApi/JSApi';
import Route from '../JSApi/Route';
import * as RouteTypes from '../JSApi/RouteTypes';
import ProgramManager from '../managers/ProgramsManager';
import IncentiveManager from '../managers/IncentivesManager';
import DealManager from '../managers/DealManager';
import LenderManager from '../managers/LenderManager';

class RRApi extends JSApi{
  constructor() {
    super();
    this.delay = 0;
    this.dataIsPromise = true;
    this.routes = [
      new Route(RouteTypes.GET, 'ratesandresiduals/{dealerId}/lenders', this.getLenders),
      new Route(RouteTypes.GET, 'ratesandresiduals/{dealerId}/lender/{lender}/programs', this.getPrograms),
      new Route(RouteTypes.GET, 'ratesandresiduals/{dealerId}/scenario/{scenarioId}/program', this.getSelectedProgram),
      new Route(RouteTypes.POST, 'ratesandresiduals/{dealerId}/incentives', this.getIncentives),
      new Route(RouteTypes.GET, 'ratesandresiduals/{dealerId}/scenario/{scenarioId}/incentives', this.getSelectedIncentives),
      new Route(RouteTypes.PUT, 'ratesandresiduals/{dealerId}/scenario/{scenarioId}/incentives', this.updateScenario)
    ];
  }

  getLenders(uri){
    const {dealerId} = this.getURIProperties(uri);
    return LenderManager.getLenders(dealerId);
  }

  getPrograms(uri){
    const {dealerId, lender} = this.getURIProperties(uri);
    return ProgramManager.getPrograms(dealerId, lender);
  }

  getSelectedProgram(uri){
    const {dealerId, scenarioId} = this.getURIProperties(uri);
    return ProgramManager.getSelectedProgram(dealerId, scenarioId);
  }

  getIncentives(uri, data){
    const {dealerId} = this.getURIProperties(uri);
    return IncentiveManager.getIncentives(dealerId, data.program);
  }

  getSelectedIncentives(uri){
    const {dealerId, scenarioId} = this.getURIProperties(uri);
    return IncentiveManager.getSelectedIncentives(dealerId, scenarioId);
  }

  updateScenario(uri, data){
    const {dealerId, scenarioId} = this.getURIProperties(uri);
    return DealManager.updateScenarioFromRR(dealerId, scenarioId, data.selectedProgram, data.selectedIncentives);
  }
}

export default new RRApi();
