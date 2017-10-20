import taxSetupReducer from "../tax-setup-reducers";
import {
  fetchFeeTaxSetupTableDataSuccess,
  updateTaxSetupInput
} from "../../actions/taxes-page-actions";
import mockTaxSetupData from "../../api/tax-setup-mock.json";
import { assert } from "chai";

describe("Taxsetup Reducers", () => {
  it("updates store when Taxsetup data is retrieved", done => {
    const expectedNextState = {
      capReductionTaxMethod: {
        value: 12,
        label: "Acq,Rebate"
      },
      capReductionTaxPercent: "4",
      capTaxFees: true,
      capTaxProducts: true,
      leaseFlat: "415",
      leaseTaxFees: false,
      leaseTaxMethod: {
        label: "Sales Price/Doc Fee/ESC",
        value: 13
      },
      leaseTaxPercent: "4",
      leaseTaxProducts: false,
      leaseTradeCredit: {
        label: "Leaser of payoff and allowance",
        value: 2
      },
      leaseTradeCreditAmount: "223",
      monthlyTaxFees: true,
      monthlyTaxMethod: {
        label: "Monthly Payment",
        value: 10
      },
      monthlyTaxProducts: false,
      monthlyUseTaxPercent: "33",
      retailFlat: "500",
      retailTaxFees: false,
      retailTaxMethod: {
        label: "Sale Price/Doc Fee/ESC",
        value: 11
      },
      retailTaxPercent: "4",
      retailTaxProducts: true,
      retailTradeCredit: {
        label: "Customer Trade Equity",
        value: 2
      },
      retailTradeCreditAmount: "45"
    };

    const action = fetchFeeTaxSetupTableDataSuccess(mockTaxSetupData);
    const prevState = {};
    const actualNextState = taxSetupReducer(prevState, action);
    assert(actualNextState, expectedNextState);
    done();
  });

  it("updates store when a input field is changed", done => {
    const testField = "testField";
    const prevState = { [testField]: "testValuePrevious" };
    const newValue = "testValueUpdated";
    const action = updateTaxSetupInput(testField, newValue);
    const actualNextState = taxSetupReducer(prevState, action);
    assert(actualNextState[testField], newValue);
    done();
  });
});
