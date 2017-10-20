/**
 * Created by RBANDERSON on 9/7/2017.
 */
'use strict';
import {put, call, fork, takeEvery} from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import * as customerActions from '../actions/customerActions';
import * as dealActions from '../actions/dealActions';
import DeskingApi from '../api/DeskingApi';

export function *initialize(action){
  try {
    const customer = (yield call(DeskingApi.getCustomer, action.payload.leadId)).data;
    const deal = (yield call(DeskingApi.getDeal, action.payload.dealId)).data;
    yield put(customerActions.setCustomer(customer));
    yield put(dealActions.setDeal(deal));
    yield put({type: ActionTypes.INITIALIZATION_SUCCEEDED});
  }
  catch (e){
    yield put({type: ActionTypes.INITIALIZATION_FAILED});
  }
}

export default function *forks(){
  yield fork(takeEvery,ActionTypes.INITIALIZATION_REQUESTED, initialize);
}
