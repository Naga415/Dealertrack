'use strict';
import MockData from '../data/MockData';
import ScenarioFactory from '../factories/ScenarioFactory';
import ScenarioUpdater from '../utils/ScenarioUpdater';
import ProgramManager from './ProgramsManager';
import IncentivesManager from './IncentivesManager';

export default class DealManager {
  static async getDeal(dealId){// eslint-disable-line no-unused-vars
    return MockData.deal;
  }

  static async updateScenarioType(newType, scenario){
    const newScenario = ScenarioFactory.updateScenarioType(newType,scenario);
    this.updateDealScenarios(newScenario);
    return newScenario;
  }

  static updateDealScenarios(updatedScenario){
    if (MockData.deal.primaryScenario.id===updatedScenario.id){
      MockData.deal.primaryScenario = updatedScenario;
    }
    MockData.deal.scenarios.map(scenario => scenario.id === updatedScenario.id ? updatedScenario : scenario);
  }

  static async updateDealScenario(scenario){
    const updatedScenario = ScenarioUpdater.update(scenario);
    this.updateDealScenarios(updatedScenario);
    return updatedScenario;
  }

  static async getProfitBreakdown(scenarioId) {
    const scenario = MockData.deal.scenarios.find(scenario => scenario.id === Number(scenarioId));
    return {
      profitBreakdown: {
        frontProfitBreakdown: scenario.frontProfitBreakdown,
        backProfitBreakdown: scenario.backProfitBreakdown
      }
    };
  }

  static async updateScenarioFromRR(dealerId, scenarioId, program, incentives){
    await ProgramManager.setSelectedProgram(program);
    await IncentivesManager.setSelectedIncentives(incentives);
    return MockData.deal.scenarios.find(scenario => scenario.id === parseInt(scenarioId, 10));
  }
}
