"use strict";

import * as actions from "./FeesActions";
import * as types from "./actionTypes";

describe("fees Actions", () => {
  it("should create an action to handle change from form", () => {
    const e = {
      target: {
        value: "value",
        name: "name"
      }
    };
    const attr = "feesName";
    const expectedAction = {
      type: types.HANDLE_CHANGE_FROM_FORM,
      payload: {
        attr,
        value: e.target.value,
        name: e.target.name
      }
    };
    expect(actions.handleChangeFromForm(attr, e)).toEqual(expectedAction);
  });

  it("should create an action to handle change from input", () => {
    const e = {
      target: {
        value: "value",
        name: "name"
      }
    };
    const expectedAction = {
      type: types.HANDLE_CHANGE_FROM_INPUT,
      payload: {
        value: e.target.value,
        name: e.target.name
      }
    };
    expect(actions.handleChangeFromInput(e)).toEqual(expectedAction);
  });

  it("should create an action to handle blur from input", () => {
    const e = {
      target: {
        value: "value",
        name: "name"
      }
    };
    const expectedAction = {
      type: types.HANDLE_BLUR_FROM_INPUT,
      payload: {
        value: e.target.value,
        name: e.target.name
      }
    };
    expect(actions.handleBlurFromInput(e)).toEqual(expectedAction);
  });

  it("should create an action to delete a fee", () => {
    const index = 1;
    const expectedAction = {
      type: types.DELETE_FEE,
      payload: {
        index
      }
    };
    expect(actions.deleteFee(index)).toEqual(expectedAction);
  });

  it("should create an action to append a fee", () => {
    const expectedAction = {
      type: types.APPEND_FEE
    };
    expect(actions.appendFee()).toEqual(expectedAction);
  });

  it("should create an action to refresh form", () => {
    const expectedAction = {
      type: types.REFRESH_FORM
    };
    expect(actions.refreshForm()).toEqual(expectedAction);
  });

  it("should create an action to cancel editing", () => {
    const expectedAction = {
      type: types.CANCEL_EDITING
    };
    expect(actions.cancelEditing()).toEqual(expectedAction);
  });

  it("should create an action to validate quote fees", () => {
    const expectedAction = {
      type: types.VALIDATE_QUOTE_FEES,
      payload: {
        error: {
          "Fee Type": true,
          "Fee Name": false,
          Amount: true,
          "Paid To Code": true
        },
        formHasError: true
      }
    };

    const inputData = [
      {
        feeType: "",
        feeCustomName: "feeCustomName-1",
        feeAmount: "1,333.00",
        paidTo: "paidTo-1"
      },
      {
        feeType: "feeType-2",
        feeCustomName: "feeCustomName-2",
        feeAmount: "NaN",
        paidTo: ""
      }
    ];

    expect(actions.validateQuoteFees(inputData)).toEqual(expectedAction);
  });

  it("should create an action to save quote fees", () => {
    const expectedAction = {
      type: types.SAVE_QUOTE_FEES
    };
    expect(actions.saveQuoteFees()).toEqual(expectedAction);
  });
});
