"use strict";
import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { HomePage } from "./HomePage";

const closeDialog = sinon.spy();
const populateValue = sinon.spy();
const deleteFee = sinon.spy();
const handleChangeFromForm = sinon.spy();
const handleBlurFromInput = sinon.spy();
const handleChangeFromInput = sinon.spy();
const appendFee = sinon.spy();
const fetchExistingFeeQuoteFee = sinon.stub();

afterEach(() => {
  closeDialog.reset();
  populateValue.reset();
  deleteFee.reset();
  handleChangeFromForm.reset();
  handleBlurFromInput.reset();
  handleChangeFromInput.reset();
  appendFee.reset();
});

describe("HomePage specs", () => {
  const props = {
    closeDialog,
    populateValue,
    deleteFee,
    handleChangeFromForm,
    handleBlurFromInput,
    handleChangeFromInput,
    appendFee,
    fetchExistingFeeQuoteFee,
    quoteFees: [],
    grouppedFees: {},
    name: "fees",
    dialogStatus: false,
    dealId: 123,
    scenarioId: 234,
    zipCode: 11111
  };

  it("renders <HomePage />", () => {
    const component = renderer.create(<HomePage {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("filterQuoteFees returns formatted array", () => {
    const component = shallow(<HomePage {...props} />);
    const qf = [
      {
        feeId: 0,
        feeCategory: "",
        feeCategoryId: 0,
        feeType: "feeType-0",
        feeTypeId: 0,
        state: "",
        feeCustomName: "feeCustomName-0",
        capitalizedIndicator: false,
        feeAmount: "12.00",
        paidTo: "paidTo-0"
      },
      {
        feeId: 1,
        feeCategory: "",
        feeCategoryId: 0,
        feeType: "feeType-1",
        feeTypeId: 0,
        state: "",
        feeCustomName: "feeCustomName-1",
        capitalizedIndicator: true,
        feeAmount: "1,333.00",
        paidTo: "paidTo-1"
      },
      {
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
      }
    ];

    const returnedValue = component.instance().filterQuoteFees(qf);

    expect(returnedValue.length).toEqual(2);

    expect(returnedValue[0].feeAmount).toEqual(12);
    expect(returnedValue[0].capitalizedIndicator).toBeFalsy();
    expect(returnedValue[0].zipCode).toEqual(11111);

    expect(returnedValue[1].feeAmount).toEqual(1333);
    expect(returnedValue[1].capitalizedIndicator).toBeTruthy();
    expect(returnedValue[0].zipCode).toEqual(11111);
  });

  it("showError returns correct error msg", () => {
    const tmpProps = Object.assign({}, props, {
      error: {
        "Fee Type": false,
        "Fee Name": true,
        Amount: false,
        "Paid To Code": true
      }
    });
    const component = shallow(<HomePage {...tmpProps} />);
    const returnedMSG = component.instance().showError();

    expect(returnedMSG).toEqual(
      "Please Select Fields: Fee Name, Paid To Code."
    );
  });
});
