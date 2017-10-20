import taxPageReducer from "../taxes-page-reducers";
import {
  fetchFeeTaxSetupTableDataSuccess,
} from "../../actions/taxes-page-actions";
import mockTaxSetupData from "../../api/tax-setup-mock.json";
import { assert } from "chai";

const TaxesPageTabs = jest.fn();
const taxSetupInitState = jest.fn();
const feeTaxSetupInitState = jest.fn();

describe("taxesPage Reducers", () => {
  it("updates store when taxesPage data is retrieved", done => {
    const expectedNextState = {
      currentTab: TaxesPageTabs["tax-setup"],
      noTaxes: false,
      profile: null,
      state: "State",
      zipcode: "Zipcode",
      taxSetup: taxSetupInitState,
      feeTaxSetup: feeTaxSetupInitState
    };
    const action = fetchFeeTaxSetupTableDataSuccess(mockTaxSetupData);
    const prevState = {};
    const actualNextState = taxPageReducer(prevState, action);
    assert(actualNextState, expectedNextState);
    done();
  });
});
