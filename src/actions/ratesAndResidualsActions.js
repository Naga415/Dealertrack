/**
 * Created by RBANDERSON on 9/29/2017.
 */
'use strict';
import * as ActionTypes from './actionTypes';

export function initialize(dealerId){
  return {
    type: ActionTypes.INITIALIZE_RR_REQUESTED,
    payload: {dealerId}
  };
}

export function setLenders(lenders){
  return {
    type: ActionTypes.SET_RR_LENDERS,
    payload: {lenders}
  };
}

export function setSelectedLender(selectedLender){
  return {
    type: ActionTypes.SET_RR_SELECTED_LENDER,
    payload: {selectedLender}
  };
}

export function setPrograms(programs){
  return {
    type: ActionTypes.SET_RR_PROGRAMS,
    payload: {programs}
  };
}

export function retrievePrograms(dealerId, lender){
  return {
    type: ActionTypes.RETRIEVE_RR_PROGRAMS_REQUESTED,
    payload: {dealerId, lender}
  };
}

export function retrieveIncentives(dealerId, program){
  return {
    type: ActionTypes.RETRIEVE_RR_INCENTIVES_REQUESTED,
    payload: {dealerId, program}
  };
}


export function setIncentives(incentives){
  return {
    type: ActionTypes.SET_RR_INCENTIVES,
    payload: {incentives}
  };
}

export function updateScenarioAsync(dealerId, scenarioId, program, incentives){
  return {
    type: ActionTypes.UPDATE_SCENARIO_FROM_RR_REQUESTED,
    payload: {dealerId, scenarioId, program, incentives}
  };
}

export function setSelectedIncentives(incentives){
  return {
    type: ActionTypes.SET_RR_SELECTED_INCENTIVES,
    payload: {incentives}
  };
}

export function setSelectedProgram(program){
  return {
    type: ActionTypes.SET_RR_SELECTED_PROGRAM,
    payload: {program}
  };
}
