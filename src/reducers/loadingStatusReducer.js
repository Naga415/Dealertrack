'use strict';
import * as ActionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function loadingStatusReducer(state = initialState.loading, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZATION_SUCCEEDED:
      return false;
    default:
      return state;
  }
}
