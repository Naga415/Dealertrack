'use strict';
import Api from '../mock-service/RRApi/RRApi';

export default class RatesAndResidualsApi {
  static getLenders(dealerId){
    return Api.get(`ratesandresiduals/${dealerId}/lenders`);
  }

  static getPrograms(dealerId, lender){
    return Api.get(`ratesandresiduals/${dealerId}/lender/${lender}/programs`);
  }

  static getSelectedPrograms(dealerId, scenarioId){
    return Api.get(`ratesandresiduals/${dealerId}/scenario/${scenarioId}/program`);
  }

  static getIncentives(dealerId, program){
    return Api.post(`ratesandresiduals/${dealerId}/incentives`,{program});
  }

  static getSelectedIncentives(dealerId, scenarioId){
    return Api.get(`ratesandresiduals/${dealerId}/scenario/${scenarioId}/incentives`);
  }

  static updateScenario(dealerId, scenarioId, selectedProgram, selectedIncentives){
    return Api.put(`ratesandresiduals/${dealerId}/scenario/${scenarioId}/incentives`, {selectedProgram, selectedIncentives});
  }
}
