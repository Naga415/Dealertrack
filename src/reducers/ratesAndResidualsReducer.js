'use strict';
import initialState from './initialState';
import ObjectUtil from '../utils/ObjectUtil';
import {SET_RR_LENDERS, SET_RR_SELECTED_LENDER, SET_RR_PROGRAMS, SET_RR_INCENTIVES,SET_RR_SELECTED_PROGRAM,SET_RR_SELECTED_INCENTIVES} from '../actions/actionTypes';

export default function ratesAndResidualsReducer(ratesAndResiduals = initialState.ratesAndResiduals, action) {
  switch (action.type) {
    case SET_RR_LENDERS:
      return ObjectUtil.clone(ratesAndResiduals, {lenders: [...action.payload.lenders]});
    case SET_RR_SELECTED_LENDER:
      return {...ratesAndResiduals, ...{selectedLender: action.payload.selectedLender}};
    case SET_RR_PROGRAMS:
      return ObjectUtil.clone(ratesAndResiduals, {programs: ObjectUtil.cloneArray(action.payload.programs)});
    case SET_RR_SELECTED_PROGRAM:
      return ObjectUtil.clone(ratesAndResiduals, {selectedProgram: ObjectUtil.clone(action.payload.program)});
    case SET_RR_INCENTIVES:
      return ObjectUtil.clone(ratesAndResiduals, {incentives: ObjectUtil.cloneArray(action.payload.incentives)});
    case SET_RR_SELECTED_INCENTIVES:
      return ObjectUtil.clone(ratesAndResiduals, {selectedIncentives: ObjectUtil.cloneArray(action.payload.incentives)});
    default:
      return ratesAndResiduals;
  }
}
