"use strict";
import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import cloneDeep from "lodash/cloneDeep";
import RebatesFormElements from "./RebatesFormElements";
import 'jsdom-global/register';

describe("RebatesFormElements specs", () => {
  const rebates = [
    {
      id: 1,
      type: "Incentives",
      name: "Incentives",
      amount: "6465"
    },
    {
      id: 2,
      type: "LoyaltyCash",
      name: "Loyalty Cash",
      amount: "565"
    },
    {
      type: "DealerRebate",
      name: "Dealer Rebate",
      subElements: [
        {
          id: 3,
          amount: "5454"
        },
        {
          id: 4,
          amount: "321"
        },
        {
          id: 5,
          amount: "33"
        }
      ]
    }
  ];
    
  const handleOnInputChange = sinon.spy();
  const handleOnInputBlur = sinon.spy();
  const handleOnAddDealerAmount = sinon.spy();
  const handleOnRemoveDealerAmount = sinon.spy();

  let component, props;

  beforeEach((done) => {
    props = {
      rebates,
      onChange: handleOnInputChange,
      onBlur: handleOnInputBlur,
      onDealerRebateAdd: handleOnAddDealerAmount,
      onDealerRebateRemove: handleOnRemoveDealerAmount
    };
    component = mount(<RebatesFormElements {...props} />);
    done();
  });

  afterEach((done) => {
    handleOnInputChange.reset();
    handleOnInputBlur.reset();
    handleOnAddDealerAmount.reset();
    handleOnRemoveDealerAmount.reset();
    done();
  });

  it("should render <RebatesFormElements />", () => {
    component = renderer.create(<RebatesFormElements {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should call onChange handler when any input changes", () => {
    component.find("#Incentives-Input").simulate("change", { target: { value: "1"}});
    component.find("#LoyaltyCash-Input").simulate("change", { target: { value: "1"}});
    component.find("#DealerRebate-1-Input").simulate("change", { target: { value: "1"}});
    component.find("#DealerRebate-2-Input").simulate("change", { target: { value: "1"}});
    component.find("#DealerRebate-3-Input").simulate("change", { target: { value: "1"}});
    expect(handleOnInputChange.callCount).toEqual(5);
  });

  it("should call onChange handler when any input blurs out", () => {
    component.find("#Incentives-Input").simulate("blur");
    component.find("#LoyaltyCash-Input").simulate("blur");
    component.find("#DealerRebate-1-Input").simulate("blur");
    component.find("#DealerRebate-2-Input").simulate("blur");
    component.find("#DealerRebate-3-Input").simulate("blur");
    expect(handleOnInputBlur.callCount).toEqual(5);
  });

  it("should disable remove icon for a dealer rebate when minimum limit is reached", () => {
    const updatedProps = cloneDeep(props);
    updatedProps.rebates[2].subElements = [{
      id: 6,
      amount: "44"
    }]; // Minimum limit is reached
    component = mount(<RebatesFormElements {...updatedProps} />);
    expect(component.find("#dealer-rebate-remove-1.disabled").length).toEqual(1);
  });


  it("should disable add icon for all dealer rebate except the last one when maximum limit is not reached", () => {
    expect(component.find("#dealer-rebate-add-1.disabled").length).toEqual(1);
    expect(component.find("#dealer-rebate-add-2.disabled").length).toEqual(1);
    expect(component.find("#dealer-rebate-add-3.disabled").length).toEqual(0);
  });


  it("should disable add icon for all dealer rebates when maximum limit is reached", () => {
    const updatedProps = cloneDeep(props);
    updatedProps.rebates[2].subElements.push({
      id: 6,
      amount: "44"
    }); // Maximum limit is reached
    component = mount(<RebatesFormElements {...updatedProps} />);
    expect(component.find("#dealer-rebate-add-1.disabled").length).toEqual(1);
    expect(component.find("#dealer-rebate-add-2.disabled").length).toEqual(1);
    expect(component.find("#dealer-rebate-add-3.disabled").length).toEqual(1);
    expect(component.find("#dealer-rebate-add-4.disabled").length).toEqual(1);
  });

  it("should call onDealerAdd handler when maximum limit is not reached and add icon is clicked on the last delaer rebate", () => {
    component.find("#dealer-rebate-add-3").simulate("click"); // click on last one
    expect(handleOnAddDealerAmount.calledOnce).toEqual(true);
  });

  it("should call onDealerRemove hanlder when minimum limit is not reached and remove icon is clicked on any of the dealer rebates", () => {
    component.find("#dealer-rebate-remove-1").simulate("click"); // click on last one
    expect(handleOnRemoveDealerAmount.calledWith(1)).toEqual(true);
    component.find("#dealer-rebate-remove-2").simulate("click"); // click on last one
    expect(handleOnRemoveDealerAmount.calledWith(2)).toEqual(true);
    component.find("#dealer-rebate-remove-3").simulate("click"); // click on last one
    expect(handleOnRemoveDealerAmount.calledWith(3)).toEqual(true);
  });
});
