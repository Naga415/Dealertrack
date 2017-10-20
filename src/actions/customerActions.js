/**
 * Created by RBANDERSON on 9/7/2017.
 */
'use strict';
import * as ActionTypes from './actionTypes';

export function setCustomer(customer){
  return {
    type: ActionTypes.SET_CUSTOMER,
    payload: {customer}
  };
}
