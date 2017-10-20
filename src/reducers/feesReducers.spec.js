"use strict";

import { feesReducers, initialState, initialQuoteFee } from "./feesReducers";
import * as types from "../actions/actionTypes";

describe("fees Reducer", () => {
  it("should return the initial state", () => {
    expect(feesReducers(undefined, {})).toEqual(initialState);
  });

  it("should return modified quoteFees", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeCustomName: "Hello"
        },
        {
          feeId: 1002,
          feeCustomName: "World"
        },
        {
          feeId: 1003,
          feeCustomName: "Peace"
        }
      ]
    };

    const newState = feesReducers(state, {
      type: types.HANDLE_CHANGE_FROM_FORM,
      payload: {
        value: "Something Else",
        name: "something-something-0",
        attr: "feeCustomName"
      }
    });

    expect(newState["quoteFees"].length).toEqual(state["quoteFees"].length);
    expect(newState["quoteFees"][0].feeCustomName).toEqual("Something Else");
  });

  it("should return quoteFees with updated input data from change", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeAmount: "2,332.40"
        },
        {
          feeId: 1002,
          feeAmount: "1,230.00"
        },
        {
          feeId: 1003,
          feeAmount: "345.00"
        }
      ]
    };

    const newState = feesReducers(state, {
      type: types.HANDLE_CHANGE_FROM_INPUT,
      payload: {
        value: "12555",
        name: "something-something-0"
      }
    });

    expect(newState["quoteFees"].length).toEqual(state["quoteFees"].length);
    expect(newState["quoteFees"][0].feeAmount).toEqual("12555");
  });

  it("should return quoteFees with updated input data from blur", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeAmount: "2,332.40"
        },
        {
          feeId: 1002,
          feeAmount: "1,230.00"
        },
        {
          feeId: 1003,
          feeAmount: "345.00"
        }
      ]
    };

    const newState = feesReducers(state, {
      type: types.HANDLE_BLUR_FROM_INPUT,
      payload: {
        value: "12555",
        name: "something-something-0"
      }
    });

    expect(newState["quoteFees"].length).toEqual(state["quoteFees"].length);
    expect(newState["quoteFees"][0].feeAmount).toEqual("12,555.00");
  });

  it("should return updated quoteFees when deleting", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeCategory: "Dealer Fees"
        },
        {
          feeId: 1002,
          feeCategory: "Dealer Fees"
        },
        {
          feeId: 1003,
          feeCategory: "Dealer Fees"
        }
      ]
    };

    const newState = feesReducers(state, {
      type: types.DELETE_FEE,
      payload: {
        index: 1
      }
    });

    expect(newState["quoteFees"].length).toEqual(2);
    expect(newState["quoteFees"][0].feeId).toEqual(1001);
    expect(newState["quoteFees"][1].feeId).toEqual(1003);
  });

  it("should return updated quoteFees when adding", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeCategory: "Dealer Fees",
          feeCategoryId: 1,
          feeType: "Documentation Fee",
          feeTypeId: 5,
          state: "NY",
          zipCode: 11021,
          feeCustomName: "Doc. Fee",
          capitalizedIndicator: true,
          feeAmount: 250.75,
          paidTo: "Dealer"
        }
      ]
    };

    const newState = feesReducers(state, {
      type: types.APPEND_FEE
    });

    expect(newState["quoteFees"].length).toEqual(2);
  });

  it("should return updated states when refreshing", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeCategory: "Dealer Fees",
          feeCategoryId: 1,
          feeType: "Documentation Fee",
          feeTypeId: 5,
          state: "NY",
          zipCode: 11021,
          feeCustomName: "Doc. Fee",
          capitalizedIndicator: true,
          feeAmount: 250.75,
          paidTo: "Dealer"
        },
        initialQuoteFee
      ],
      error: {
        "Fee Type": true,
        "Fee Name": true,
        Amount: true,
        "Paid To Code": true
      },
      formHasError: true
    };
    const newState = feesReducers(state, {
      type: types.REFRESH_FORM
    });

    expect(newState["quoteFees"].length).toEqual(1);
    expect(newState.formHasError).toBeFalsy();
    expect(newState.error["Fee Type"]).toBeFalsy();
    expect(newState.error["Fee Name"]).toBeFalsy();
    expect(newState.error["Amount"]).toBeFalsy();
    expect(newState.error["Paid To Code"]).toBeFalsy();
  });

  it("should return updated states when canceling", () => {
    const state = {
      savedQuoteFees: [
        {
          feeId: 1001,
          feeCategory: "Dealer Fees",
          feeCategoryId: 1,
          feeType: "Documentation Fee",
          feeTypeId: 5,
          state: "NY",
          zipCode: 11021,
          feeCustomName: "Doc. Fee",
          capitalizedIndicator: true,
          feeAmount: 250.75,
          paidTo: "Dealer"
        },
        initialQuoteFee
      ]
    };
    const newState = feesReducers(state, {
      type: types.CANCEL_EDITING
    });

    expect(newState.hasOwnProperty("quoteFees")).toBeTruthy();
    expect(newState["quoteFees"].length).toEqual(
      newState["savedQuoteFees"].length
    );
  });

  it("should return updated states when validating", () => {
    const newState = feesReducers(undefined, {
      type: types.VALIDATE_QUOTE_FEES,
      payload: {
        error: {
          "Fee Type": true,
          "Fee Name": false,
          Amount: false,
          "Paid To Code": true
        },
        formHasError: true
      }
    });
    expect(newState.formHasError).toBeTruthy();
    expect(newState.error["Fee Type"]).toBeTruthy();
    expect(newState.error["Fee Name"]).toBeFalsy();
    expect(newState.error["Amount"]).toBeFalsy();
    expect(newState.error["Paid To Code"]).toBeTruthy();
  });

  it("should return updated states when saving", () => {
    const state = {
      quoteFees: [
        {
          feeId: 1001,
          feeCategory: "Dealer Fees",
          feeCategoryId: 1,
          feeType: "Documentation Fee",
          feeTypeId: 5,
          state: "NY",
          zipCode: 11021,
          feeCustomName: "Doc. Fee",
          capitalizedIndicator: true,
          feeAmount: 250.75,
          paidTo: "Dealer"
        },
        initialQuoteFee,
        initialQuoteFee
      ]
    };

    const newState = feesReducers(state, {
      type: types.SAVE_QUOTE_FEES
    });

    expect(newState.hasOwnProperty("savedQuoteFees")).toBeTruthy();
    expect(newState["savedQuoteFees"].length).toEqual(2);
    expect(newState["quoteFees"].length).toEqual(2);
  });
});
