"use strict";
import axios from "axios";
import * as types from "./actionTypes";

export const FeesURL =
  "http://swaggerhub.np.aws.dealertrack.com/virts/Denzil-Tarakan/dealstransformers/1.0.0/123/quote/345/fee/";

/* Sync actions */

export const fetchExistingFeeQuoteFeeSuccess = data => {
  return {
    type: types.FETCH_EXISTING_FEE_QUOTE_FEE_SUCCESS,
    payload: {
      fees: data.fees,
      quoteFees: data.quote_fees
    }
  };
};

export const handleChangeFromForm = (attr, e) => {
  return {
    type: types.HANDLE_CHANGE_FROM_FORM,
    payload: {
      attr,
      value: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      name: e.target.name
    }
  };
};

export const handleChangeFromInput = e => {
  return {
    type: types.HANDLE_CHANGE_FROM_INPUT,
    payload: {
      value: e.target.value,
      name: e.target.name
    }
  };
};

export const handleBlurFromInput = e => {
  return {
    type: types.HANDLE_BLUR_FROM_INPUT,
    payload: {
      value: e.target.value,
      name: e.target.name
    }
  };
};

export const deleteFee = index => {
  return {
    type: types.DELETE_FEE,
    payload: {
      index
    }
  };
};

export const appendFee = () => {
  return {
    type: types.APPEND_FEE
  };
};

export const refreshForm = () => {
  return {
    type: types.REFRESH_FORM
  };
};

export const cancelEditing = () => {
  return {
    type: types.CANCEL_EDITING
  };
};

export const validateQuoteFees = data => {
  const tmpError = {
    "Fee Type": false,
    "Fee Name": false,
    Amount: false,
    "Paid To Code": false
  };
  let tmpStatus = false;

  for (let i = 0; i < data.length; i++) {
    tmpError["Fee Type"] =
      data[i].feeType === null ||
      data[i].feeType === "" ||
      tmpError["Fee Type"];
    tmpError["Fee Name"] =
      data[i].feeCustomName === null ||
      data[i].feeCustomName === "" ||
      tmpError["Fee Name"];
    tmpError["Amount"] =
      data[i].feeAmount === 0 ||
      data[i].feeAmount === "NaN" ||
      tmpError["Amount"];
    tmpError["Paid To Code"] =
      data[i].paidTo === null ||
      data[i].paidTo === "" ||
      tmpError["Paid To Code"];
  }

  for (const keys in tmpError) {
    if (tmpError[keys]) tmpStatus = true;
  }

  return {
    type: types.VALIDATE_QUOTE_FEES,
    payload: {
      error: tmpError,
      formHasError: tmpStatus
    }
  };
};

export const saveQuoteFees = () => {
  return {
    type: types.SAVE_QUOTE_FEES
  };
};

/* Async actions */
// eslint-disable-next-line
export const fetchExistingFeeQuoteFee = (dealId, scenarioId) => {
  return dispatch => {
    return axios
      .get(FeesURL)
      .then(data => dispatch(fetchExistingFeeQuoteFeeSuccess(data.data)));
  };
};

// eslint-disable-next-line
export const pushFeeQuoteFee = (data, dealId, scenarioId) => {
  return () => {
    return axios.put(FeesURL, data, {
      headers: { Authorization: "dt_test_token" }
    });
  };
};
