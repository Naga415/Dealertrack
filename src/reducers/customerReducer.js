'use strict';
import { SET_CUSTOMER } from '../actions/actionTypes';
import ObjectUtil from '../utils/ObjectUtil';
import initialState from './initialState';

export default function customerReducer(customer = initialState.customer, action) {
  switch (action.type) {
    case SET_CUSTOMER:
      return ObjectUtil.clone(customer, action.payload.customer);
    default:
      return customer;
  }
}

