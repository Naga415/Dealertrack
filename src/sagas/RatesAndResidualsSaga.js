/**
 * Created by RBANDERSON on 9/29/2017.
 */
'use strict';
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import * as rrActions from '../actions/ratesAndResidualsActions';
import * as dealActions from '../actions/dealActions';

import RatesAndResidualsApi from '../api/RatesAndResidualsApi';

export function *initialize(action){
  try {
    const lenders = (yield call(RatesAndResidualsApi.getLenders, action.payload.dealId)).data;
    const defaultLender = lenders && lenders[0];
    const programs = (yield call(RatesAndResidualsApi.getPrograms, action.payload.dealId, defaultLender)).data;
    yield put(rrActions.setLenders(lenders));
    yield put(rrActions.setSelectedLender(defaultLender));
    yield put(rrActions.setPrograms(programs));
    yield put({type: ActionTypes.INITIALIZE_RR_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.INITIALIZE_RR_FAILED});
  }
}

export function *getPrograms(action){
  try {
    const programs = (yield call(RatesAndResidualsApi.getPrograms, action.payload.dealId, action.payload.lender)).data;
    yield put(rrActions.setPrograms(programs));
    yield put({type: ActionTypes.RETRIEVE_RR_PROGRAMS_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.RETRIEVE_RR_PROGRAMS_FAILED});
  }
}

export function *getIncentives(action){
  try {
    const incentives = (yield call(RatesAndResidualsApi.getIncentives, action.payload.dealId, action.payload.program)).data;
    yield put(rrActions.setIncentives(incentives));
    yield put({type: ActionTypes.RETRIEVE_RR_INCENTIVES_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.RETRIEVE_RR_INCENTIVES_FAILED});
  }
}

export function *updateScenario(action){
  try {
    const {dealerId, scenarioId, program, incentives} = action.payload;
    const scenario = (yield call(RatesAndResidualsApi.updateScenario, dealerId, scenarioId, program, incentives)).data;
    yield put(dealActions.updateScenario(scenario));
    yield put(rrActions.setSelectedProgram(program));
    yield put(rrActions.setSelectedIncentives(incentives));
    yield put({type: ActionTypes.UPDATE_SCENARIO_FROM_RR_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.UPDATE_SCENARIO_FROM_RR_FAILED});
  }
}

export default function *forks(){
  yield fork(takeEvery, ActionTypes.INITIALIZE_RR_REQUESTED, initialize);
  yield fork(takeEvery, ActionTypes.RETRIEVE_RR_PROGRAMS_REQUESTED, getPrograms);
  yield fork(takeEvery, ActionTypes.RETRIEVE_RR_INCENTIVES_REQUESTED, getIncentives);
  yield fork(takeEvery, ActionTypes.UPDATE_SCENARIO_FROM_RR_REQUESTED, updateScenario);
}
