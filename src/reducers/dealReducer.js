'use strict';
import { SET_DEAL, UPDATE_SCENARIO, UPDATE_SCENARIO_DETAILS, UPDATE_SCENARIO_TRADE, UPDATE_GROSS_DISPLAY_STATUS, UPDATE_SCENARIO_PROFIT_BREAKDOWN, SET_NEGOTIATION_STATUS, SET_NEGOTIATION_COUNTER_SCENARIO } from '../actions/actionTypes';
import ObjectUtil from '../utils/ObjectUtil';
import initialState from './initialState';

export default function dealReducer(deal = initialState.deal, action) {
  switch (action.type) {
    case SET_DEAL:
      return ObjectUtil.clone(deal, action.payload.deal);
    case UPDATE_SCENARIO:
      return updateScenario(deal, action.payload.scenario);
    case UPDATE_SCENARIO_DETAILS:
      return updateScenarioDetails(deal, action.payload);
    case UPDATE_SCENARIO_TRADE:
      return updateScenarioTrade(deal, action.payload);
    case UPDATE_GROSS_DISPLAY_STATUS:
      return updateGrossDisplayStatus(deal, action.payload);
    case UPDATE_SCENARIO_PROFIT_BREAKDOWN:
      return updateScenarioProfitBreakdown(deal, action.payload);
    case SET_NEGOTIATION_STATUS:
      return ObjectUtil.clone(deal, {negotiationStatus: action.payload.status});
    case SET_NEGOTIATION_COUNTER_SCENARIO:
      return ObjectUtil.clone(deal, {counterScenario: action.payload.scenario});    
    default:
      return deal;
  }
}

function updateScenario(deal, updatedScenario) {
  const scenarios = deal.scenarios.map(scenario => scenario.id === updatedScenario.id ? ObjectUtil.clone(updatedScenario) : scenario);
  const primaryScenario = deal.primaryScenario.id === updatedScenario.id ? ObjectUtil.clone(updatedScenario) : deal.primaryScenario;
  const updatedDeal = ObjectUtil.clone(deal, { scenarios, primaryScenario });
  return updatedDeal;
}

function updateScenarioDetails(deal, payload) {
  const { id, property } = payload;
  const scenarioToUpdate = ObjectUtil.clone(deal.scenarios.find(scenario => scenario.id === id));
  scenarioToUpdate.details = ObjectUtil.clone(scenarioToUpdate.details);

  const propertyNameElements = property.name.split('.');
  const propertyName = propertyNameElements[0];
  let propertyIndex = propertyNameElements[1];

  if (propertyIndex) {
    propertyIndex = parseInt(propertyIndex, 10);
    scenarioToUpdate.details[propertyName] = ObjectUtil.clone(scenarioToUpdate.details[propertyName]);
    scenarioToUpdate.details[propertyName][propertyIndex] = property.value;
  }
  else {
    scenarioToUpdate.details[propertyName] = property.value;
  }

  return updateScenario(deal, scenarioToUpdate);
}

function updateScenarioTrade(deal, payload) {
  const { id, property } = payload;
  const scenarioToUpdate = ObjectUtil.clone(deal.scenarios.find(scenario => scenario.id === id));
  scenarioToUpdate.trade = ObjectUtil.clone(scenarioToUpdate.trade, { [property.name]: property.value });
  return updateScenario(deal, scenarioToUpdate);
}

function updateGrossDisplayStatus(deal, payload) {
  return ObjectUtil.clone(deal, { showGrossProfit: payload.showGrossProfit });
}

function updateScenarioProfitBreakdown(deal, payload) {
  const { scenarioId, frontProfitBreakdown, backProfitBreakdown } = payload;
  const scenarioToUpdate = ObjectUtil.clone(deal.scenarios.find(scenario => scenario.id === scenarioId));
  scenarioToUpdate.frontProfitBreakdown = ObjectUtil.cloneArray(frontProfitBreakdown);
  scenarioToUpdate.backProfitBreakdown = ObjectUtil.cloneArray(backProfitBreakdown);
  return updateScenario(deal, scenarioToUpdate);
}
