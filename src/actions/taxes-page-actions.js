import 'whatwg-fetch';
import taxSetupData from '../api/tax-setup-mock.json';
import { feeTaxSetupTableData } from '../constants';


/* Action Types */ 

export const UPDATE_TAXES_PAGE_CURRENT_TAB = 'UPDATE_TAXES_PAGE_CURRENT_TAB';
export const UPDATE_EDIT_TAX_PROFILE_INPUT = 'UPDATE_EDIT_TAX_PROFILE_INPUT';
export const UPDATE_TAX_SETUP_INPUT = 'UPDATE_TAX_SETUP_INPUT';
export const TAX_SETUP_KEYWORD = 'TAX_SETUP';
export const FETCH_TAX_SETUP_DATA_SUCCESS = 'FETCH_TAX_SETUP_DATA_SUCCESS';
export const FETCH_TAX_SETUP_DATA_FAILURE = 'FETCH_TAX_SETUP_DATA_FAILURE';
export const FETCH_FEE_TAX_SETUP_DATA_SUCCESS = 'FETCH_FEE_TAX_SETUP_DATA_SUCCESS';
export const FETCH_FEE_TAX_SETUP_DATA_FAILURE = 'FETCH_FEE_TAX_SETUP_DATA_FAILURE';
export const FEE_TAX_SETUP_KEYWORD = 'FEE_TAX_SETUP';

/* Sync actions */

export const updateTaxesPageCurrentTab = ( tab ) => ({
  type: UPDATE_TAXES_PAGE_CURRENT_TAB,
  payload: {
    tab
  }
});

export const updateTaxSetupInput = ( field, value ) => ({
  type: UPDATE_TAX_SETUP_INPUT,
  payload: {
    field,
    value
  }
});

export const updateEditTaxProfileInput = ( field, value ) => ({
  type: UPDATE_EDIT_TAX_PROFILE_INPUT,
  payload: {
    field,
    value
  }
});

export const fetchTaxSetupDataSuccess = ( data ) => ({
  type: FETCH_TAX_SETUP_DATA_SUCCESS,
  payload: {
    data
  }
});

export const fetchFeeTaxSetupTableDataSuccess = ( data ) => ({
  type: FETCH_FEE_TAX_SETUP_DATA_SUCCESS,
  payload: {
    data
  }
});

/* Async actions */
export const fetchTaxSetupData = () => {
  return ( dispatch ) => {
    return new Promise((resolve ) => {
      // emulate async nature of this data request
      setTimeout(() => resolve(taxSetupData), 2000);
    })
      .then((data) => dispatch(fetchTaxSetupDataSuccess(data)));
  }; 
};

export const fetchFeeTaxSetupTableData = () => {
  return ( dispatch ) => {
    return new Promise((resolve ) => {
      // emulate async nature of this data request
      setTimeout(() => resolve(feeTaxSetupTableData), 2000);
    })
      .then((data) => dispatch(fetchFeeTaxSetupTableDataSuccess(data)));
  };
};
