import extend from 'lodash/extend';
import { UPDATE_TAXES_PAGE_CURRENT_TAB, UPDATE_EDIT_TAX_PROFILE_INPUT, TAX_SETUP_KEYWORD, FEE_TAX_SETUP_KEYWORD, FETCH_TAX_SETUP_DATA_SUCCESS } from '../actions/taxes-page-actions';
import feeTaxSetupReducer, { initialState as feeTaxSetupInitState } from './fee-tax-setup-reducers';
import taxSetupReducer, { initialState as taxSetupInitState } from './tax-setup-reducers';
import { reduceAtSubState } from '../utils/reducer-utils';
import { TaxesPageTabs } from '../constants';


const initialState = {
  currentTab: TaxesPageTabs['tax-setup'],
  noTaxes: false,
  profile: null,
  state: 'State',
  zipcode: 'Zipcode',
  taxSetup: taxSetupInitState,
  feeTaxSetup: feeTaxSetupInitState
};

const taxesPage = ( state = initialState, action) => {
  let updatedState = state;
  switch (action.type){
    case UPDATE_TAXES_PAGE_CURRENT_TAB:
      updatedState = extend({}, state, {
        currentTab: action.payload.tab
      });
      break;
    case UPDATE_EDIT_TAX_PROFILE_INPUT:
      updatedState = extend({}, state, {
        [action.payload.field]: action.payload.value
      });
      break;
    case FETCH_TAX_SETUP_DATA_SUCCESS:
      updatedState = extend({}, state, {
        noTaxes: (action.payload.data[0]['no_tax_in'] === 'Y'),
        state: action.payload.data[0]['state_code'],
        zipcode: action.payload.data[0]['zip_code']
      });
      break;
    default:
      break;
  }

  if (action.type.includes(FEE_TAX_SETUP_KEYWORD)){
    updatedState = reduceAtSubState(updatedState, action, ['feeTaxSetup'], feeTaxSetupReducer);
  } else if (action.type.includes(TAX_SETUP_KEYWORD)){
    updatedState = reduceAtSubState(updatedState, action, ['taxSetup'], taxSetupReducer);
  }
  return updatedState;
};

export default taxesPage;
