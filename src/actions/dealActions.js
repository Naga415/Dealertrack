/**
 * Created by RBANDERSON on 9/7/2017.
 */
'use strict';
import * as ActionTypes from './actionTypes';

export function setDeal(deal){
  return {
    type: ActionTypes.SET_DEAL,
    payload: {deal}
  };
}

export function updateScenarioTypeAsync(dealId, newType, scenario){
  return {
    type: ActionTypes.UPDATE_SCENARIO_TYPE_REQUESTED,
    payload: {dealId, newType, scenario}
  };
}

export function updateScenarioAsync(dealId, scenario){
  return {
    type: ActionTypes.UPDATE_SCENARIO_REQUESTED,
    payload: {dealId, scenario}
  };
}

export function updateScenario(scenario){
  return {
    type: ActionTypes.UPDATE_SCENARIO,
    payload: {scenario}
  };
}

export function updateScenarioDetails(id, property){
  return {
    type: ActionTypes.UPDATE_SCENARIO_DETAILS,
    payload: {id, property}
  };
}

export function updateScenarioTrade(id, property){
  return {
    type: ActionTypes.UPDATE_SCENARIO_TRADE,
    payload: {id, property}
  };
}

export function updateGrossDisplayStatus(showGrossProfit) {
  return {
    type: ActionTypes.UPDATE_GROSS_DISPLAY_STATUS,
    payload: {showGrossProfit}
  };
}

export function getScenarioProfitBreakdownAsync(dealId, scenarioId) {
  return {
    type: ActionTypes.GET_SCENARIO_PROFIT_BREAKDOWN_REQUESTED,
    payload: { dealId, scenarioId }
  };
}

export function updateScenarioProfitBreakdown(dealId, scenarioId, frontProfitBreakdown, backProfitBreakdown) {
  return {
    type: ActionTypes.UPDATE_SCENARIO_PROFIT_BREAKDOWN,
    payload: { dealId, scenarioId, frontProfitBreakdown, backProfitBreakdown }
  };
}

export function setNegotiationStatus(status){
  return {
    type: ActionTypes.SET_NEGOTIATION_STATUS,
    payload: {status}
  };
}

export function setNegotiationCounter(scenario){
  return {
    type: ActionTypes.SET_NEGOTIATION_COUNTER_SCENARIO,
    payload: {scenario}
  };
}

export function setNegotiationStatusAsync(dealId, status){
  return {
    type: ActionTypes.SET_NEGOTIATION_STATUS_REQUESTED,
    payload: {dealId, status}
  };
}

export function getNegotiationStatusAsync(dealId){
  return {
    type: ActionTypes.GET_NEGOTIATION_STATUS_REQUESTED,
    payload: {dealId}
  };
}
