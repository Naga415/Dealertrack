/**
 * Created by RBANDERSON on 9/7/2017.
 */
'use strict';
import * as ActionTypes from './actionTypes';

export function initialize(dealId,leadId){
  return {
    type: ActionTypes.INITIALIZATION_REQUESTED,
    payload: {dealId, leadId}
  };
}

