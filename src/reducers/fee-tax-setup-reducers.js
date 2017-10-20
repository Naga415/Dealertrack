import extend from "lodash/extend";
import { FETCH_FEE_TAX_SETUP_DATA_SUCCESS } from "../actions/taxes-page-actions";

export const initialState = {
  data: []
};
const feeTaxSetup = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEE_TAX_SETUP_DATA_SUCCESS:
      return extend({}, state, {
        data: action.payload.data
      });
    default:
      return state;
  }
};

export default feeTaxSetup;
