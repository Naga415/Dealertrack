import { connect } from "react-redux";
import extend from "lodash/extend";
import {
  updateTaxesPageCurrentTab,
  updateEditTaxProfileInput,
  updateTaxSetupInput,
  fetchTaxSetupData,
  fetchFeeTaxSetupTableData
} from "../actions/taxes-page-actions";
import HomePage from "../components/home-page";

function mapStateToProps(state) {
  return extend(
    {},
    {
      currentTab: state.taxesPage.currentTab,
      feeTaxSetup: state.taxesPage.feeTaxSetup,
      noTaxes: state.taxesPage.noTaxes,
      profile: state.taxesPage.profile,
      state: state.taxesPage.state,
      taxSetup: state.taxesPage.taxSetup,
      zipcode: state.taxesPage.zipcode
    }
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentTab: tab => dispatch(updateTaxesPageCurrentTab(tab)),
    updateEditTaxProfileInput: (input, value) =>
      dispatch(updateEditTaxProfileInput(input, value)),
    updateTaxSetupInput: (input, value) =>
      dispatch(updateTaxSetupInput(input, value)),
    fetchTaxData: () => dispatch(fetchTaxSetupData()),
    fetchFeeTaxData: () => dispatch(fetchFeeTaxSetupTableData())
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return extend({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  HomePage
);
