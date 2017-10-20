/**
 * Created by RBANDERSON on 9/12/2017.
 */
'use strict';
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import * as dealActions from '../actions/dealActions';
import DeskingApi from '../api/DeskingApi';
import * as NegotiationStatus from '../models/NegotiationStatus';

export function *updateScenarioType(action){
  try {
    const dealId = action.payload.dealId;
    const newType = action.payload.newType;
    const scenario = action.payload.scenario;
    const updatedScenario = (yield call(DeskingApi.updateScenarioType, dealId, newType, scenario)).data;
    yield put(dealActions.updateScenario(updatedScenario));
    yield put({type: ActionTypes.UPDATE_SCENARIO_TYPE_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.UPDATE_SCENARIO_TYPE_FAILED});
  }
}

export function *updateScenario(action){
  try {
    const {dealId,scenario} = action.payload;
    const updatedScenario = (yield call(DeskingApi.updateScenario,dealId, scenario)).data;
    yield put(dealActions.updateScenario(updatedScenario));
    yield put({type: ActionTypes.UPDATE_SCENARIO_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.UPDATE_SCENARIO_FAILED});
  }
}

export function *getProfitBreakdown(action){
  try {
    const {dealId, scenarioId} = action.payload;
    const profitBreakdowns = (yield call(DeskingApi.getProfitBreakdown,dealId,scenarioId)).data;
    yield put(dealActions.updateScenarioProfitBreakdown(dealId,scenarioId,profitBreakdowns.profitBreakdown.backProfitBreakdown,profitBreakdowns.profitBreakdown.frontProfitBreakdown));
    yield put({type: ActionTypes.GET_SCENARIO_PROFIT_BREAKDOWN_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.GET_SCENARIO_PROFIT_BREAKDOWN_FAILED});
  }
}

export function *getNegotiationStatus(action){
  try {
    const {dealId} = action.payload;
    const status = (yield call(DeskingApi.getNegotiationStatus, dealId)).data;
    yield *updateScenarioCounter(dealId, status);
    yield put(dealActions.setNegotiationStatus(status));
    yield put({type: ActionTypes.GET_NEGOTIATION_STATUS_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.GET_NEGOTIATION_STATUS_FAILED});
  }
}

function *updateScenarioCounter(dealId, negotiationStatus){
  if (negotiationStatus === NegotiationStatus.COUNTER_OFFER_RECEIVED){
    const counterScenario = (yield call(DeskingApi.getCounterScenario, dealId)).data;
    yield put(dealActions.setNegotiationCounter(counterScenario));
  }
  else {
    yield put(dealActions.setNegotiationCounter(null));
  }
}

export function *setNegotiationStatus(action){
  try {
    const {dealId, status} = action.payload;
    yield put(dealActions.setNegotiationStatus(status));
    DeskingApi.setNegotiationStatus(dealId, status);
    yield put({type: ActionTypes.SET_NEGOTIATION_STATUS_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.SET_NEGOTIATION_STATUS_FAILED});
  }
}

export default function *forks(){
  yield fork(takeEvery, ActionTypes.UPDATE_SCENARIO_TYPE_REQUESTED, updateScenarioType);
  yield fork(takeEvery, ActionTypes.UPDATE_SCENARIO_REQUESTED, updateScenario);
  yield fork(takeEvery, ActionTypes.GET_SCENARIO_PROFIT_BREAKDOWN_REQUESTED, getProfitBreakdown);
  yield fork(takeEvery, ActionTypes.GET_NEGOTIATION_STATUS_REQUESTED, getNegotiationStatus);
  yield fork(takeEvery, ActionTypes.SET_NEGOTIATION_STATUS_REQUESTED, setNegotiationStatus);
}
