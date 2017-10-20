"use strict";
import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import FeesFormElements from "./FeesFormElements";

const handleChangeFromForm = sinon.spy();
const handleChangeFromInput = sinon.spy();
const handleBlurFromInput = sinon.spy();
const appendFee = sinon.spy();
const deleteFee = sinon.spy();

const grouppedFees = {
  "Dealer Fees": [
    "Admin",
    "CVR Fee",
    "Delivery Handling Charges",
    "Documentation Fee"
  ],
  "Government Fees": ["Additional Highway Fee", "Agent Fee", "Air Quality"],
  "Lender Fees": ["Acquisition Fee", "Convenience Fee", "Disposition Fee"]
};

const quoteFees = [
  {
    feeId: 0,
    feeCategory: "",
    feeCategoryId: 0,
    feeType: "",
    feeTypeId: 0,
    state: "",
    feeCustomName: "",
    capitalizedIndicator: [],
    feeAmount: "",
    paidTo: ""
  }
];

afterEach(() => {
  handleChangeFromForm.reset();
  handleChangeFromInput.reset();
  handleBlurFromInput.reset();
  appendFee.reset();
  deleteFee.reset();
});

describe("FeesFormElements specs", () => {
  const props = {
    grouppedFees,
    handleChangeFromForm,
    handleChangeFromInput,
    handleBlurFromInput,
    appendFee,
    deleteFee,
    quoteFees
  };

  it("renders <FeesFormElements />", () => {
    const component = renderer.create(<FeesFormElements {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('triggers appendFee function when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const addIcon = component.find('.active-add-btnsvgicon');

    expect(addIcon).toHaveLength(1);
    addIcon.simulate('click');
    expect(appendFee.calledOnce).toEqual(true);
  });

  it('triggers change event on Fee Type when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const select = component.find('#feesFeeType-0');

    select.simulate('click');
    expect(handleChangeFromForm.calledOnce).toEqual(false);
    select.simulate('change');
    expect(handleChangeFromForm.calledOnce).toEqual(true);
    expect(handleChangeFromForm.calledWith('feeType')).toEqual(true);
  });

  it('triggers change event on Fee Name when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const fusionInput = component.find('#feesFeeName-0');

    fusionInput.simulate('click');
    expect(handleChangeFromForm.calledOnce).toEqual(false);
    fusionInput.simulate('change');
    expect(handleChangeFromForm.calledOnce).toEqual(true);
    expect(handleChangeFromForm.calledWith('feeCustomName')).toEqual(true);
  });

  it('triggers change event on Fee Cap when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const checkbox = component.find('#feesCap-0');

    checkbox.simulate('click');
    expect(handleChangeFromForm.calledOnce).toEqual(false);
    checkbox.simulate('change');
    expect(handleChangeFromForm.calledOnce).toEqual(true);
    expect(handleChangeFromForm.calledWith('capitalizedIndicator')).toEqual(true);
  });

  it('triggers change event on paidTo when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const paidToSelect = component.find('#feesPaidTo-0');

    paidToSelect.simulate('click');
    expect(handleChangeFromForm.calledOnce).toEqual(false);
    paidToSelect.simulate('change');
    expect(handleChangeFromForm.calledOnce).toEqual(true);
    expect(handleChangeFromForm.calledWith('paidTo')).toEqual(true);
  });

  it('triggers change event on amount when click', () => {
    const component = mount(<FeesFormElements {...props} />);
    const amountInput = component.find('#feesAmount-0');

    amountInput.simulate('change');
    expect(handleChangeFromInput.calledOnce).toEqual(true);
    expect(handleBlurFromInput.calledOnce).toEqual(false);

    amountInput.simulate('blur');
    expect(handleChangeFromInput.calledOnce).toEqual(true);
    expect(handleBlurFromInput.calledOnce).toEqual(true);
  });
});
