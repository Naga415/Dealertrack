"use strict";

import * as types from "../actions/actionTypes";

export const initialQuoteFee = {
  feeId: 0,
  feeCategory: "",
  feeCategoryId: 0,
  feeType: "",
  feeTypeId: 0,
  state: "",
  feeCustomName: "",
  capitalizedIndicator: false,
  feeAmount: "",
  paidTo: ""
};

export const initialState = {
  error: {
    "Fee Type": false,
    "Fee Name": false,
    Amount: false,
    "Paid To Code": false
  },
  formHasError: false,
  fees: [],
  grouppedFees: {},
  quoteFees: [initialQuoteFee],
  savedQuoteFees: []
};

export const feesReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EXISTING_FEE_QUOTE_FEE_SUCCESS:
      const grouppedFees = {};
      const fees = action.payload.fees;
      const existingQuoteFees = action.payload.quoteFees;
      for (let i = 0; i < fees.length; i++) {
        if (!grouppedFees[fees[i]["feeCategory"]]) {
          grouppedFees[fees[i]["feeCategory"]] = [];
        }
        grouppedFees[fees[i]["feeCategory"]].push(fees[i]);
      }

      const quoteFees = existingQuoteFees.map(qf => {
        return Object.assign(
          {},
          qf,
          {
            feeAmount: qf["feeAmount"].toString()
          },
          {
            feeId: 1001,
            feeCategory: "Dealer Fees",
            feeCategoryId: 1,
            feeType: "Documentation Fee",
            feeTypeId: 5,
            state: "NY"
          }
        );
      });

      return Object.assign({}, state, {
        grouppedFees,
        quoteFees: quoteFees.concat(state.quoteFees),
        savedQuoteFees: quoteFees.concat(state.quoteFees),
        fees
      });

    case types.HANDLE_CHANGE_FROM_FORM: {
      const value = action.payload.value;
      const name = action.payload.name;
      const attr = action.payload.attr;
      const idInfo = name.split("-");
      const index = Number(idInfo[idInfo.length - 1]);
      let tmp = {};
      if (attr === "feeType") {
        const feeId = Number(value);
        tmp = Object.assign(
          {},
          state.fees.find(fee => {
            return feeId === fee.feeId;
          })
        );
        tmp["feeCustomName"] = tmp["feeType"];
      } else {
        tmp[attr] = value;
      }

      return Object.assign({}, state, {
        quoteFees: state.quoteFees.map((quoteFee, idx) => {
          return idx === index ? Object.assign({}, quoteFee, tmp) : quoteFee;
        })
      });
    }

    case types.HANDLE_CHANGE_FROM_INPUT: {
      const value = action.payload.value;
      const name = action.payload.name;
      const idInfo = name.split("-");
      const index = Number(idInfo[idInfo.length - 1]);
      return Object.assign({}, state, {
        quoteFees: state.quoteFees.map((quoteFee, idx) => {
          return idx === index
            ? Object.assign({}, quoteFee, { feeAmount: value })
            : quoteFee;
        })
      });
    }

    case types.HANDLE_BLUR_FROM_INPUT: {
      const value = action.payload.value;
      const name = action.payload.name;
      const idInfo = name.split("-");
      const index = Number(idInfo[idInfo.length - 1]);
      // change value from input to "1,000,000.00" format
      let tmp = parseFloat(value.replace(/,/g, ""))
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      tmp === "NaN" && (tmp = "");

      return Object.assign({}, state, {
        quoteFees: state.quoteFees.map((quoteFee, idx) => {
          return idx === index
            ? Object.assign({}, quoteFee, { feeAmount: tmp })
            : quoteFee;
        })
      });
    }

    case types.DELETE_FEE:
      return Object.assign({}, state, {
        quoteFees: state.quoteFees.filter((quoteFee, idx) => {
          return idx !== action.payload.index;
        })
      });

    case types.APPEND_FEE:
      return Object.assign({}, state, {
        quoteFees: [...state.quoteFees, initialQuoteFee]
      });

    case types.REFRESH_FORM:
      return Object.assign({}, state, {
        quoteFees: [initialQuoteFee],
        error: {
          "Fee Type": false,
          "Fee Name": false,
          Amount: false,
          "Paid To Code": false
        },
        formHasError: false
      });

    case types.CANCEL_EDITING:
      return Object.assign({}, state, {
        quoteFees: state.savedQuoteFees
      });

    case types.VALIDATE_QUOTE_FEES:
      return Object.assign({}, state, {
        error: action.payload.error,
        formHasError: action.payload.formHasError
      });

    case types.SAVE_QUOTE_FEES:
      const cleanedQuoteFees = state["quoteFees"].filter(fee => {
        return (
          fee.feeType.length ||
          fee.feeCustomName.length ||
          fee.feeAmount.length ||
          fee.paidTo.length
        );
      });

      return Object.assign({}, state, {
        quoteFees: cleanedQuoteFees.concat(initialQuoteFee),
        savedQuoteFees: cleanedQuoteFees.concat(initialQuoteFee)
      });

    default:
      return state;
  }
};
