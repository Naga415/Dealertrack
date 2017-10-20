"use strict";
import React from "react";
import sinon from "sinon";
import axios from "axios";
import equal from "lodash/isEqual";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import HomePage from "./HomePage";
import 'jsdom-global/register';

describe("HomePage specs", () => {
  const response = {
    data:[
      {
        rebateId: 1,
        rebateType: "Incentives",
        rebateAmount: 6465
      },
      {
        rebateId: 2,
        rebateType: "LoyaltyCash",
        rebateAmount: 565
      },
      {
        rebateId: 3,
        rebateType: "DealerRebate",
        rebateAmount: 5454
      },
      {
        rebateId: 4,
        rebateType: "DealerRebate",
        rebateAmount: 321
      }
    ]
  };

  let props, component, stubs;

  beforeEach((done) => {
    stubs = [];
    stubs.push(sinon.stub(axios, "put"));
    stubs[0].returns(Promise.resolve());
    stubs.push(sinon.stub(axios, "get"));
    stubs[1].returns(Promise.resolve(response));

    props = {
      closeDialog: sinon.spy(),
      dialogStatus: true,
      name: "dummyName",
      populateValue: sinon.spy()
    };
    component = mount(<HomePage {...props} />);
    done();
  });
  
  afterEach((done) => {
    props.closeDialog.reset();
    props.populateValue.reset();
    stubs.forEach(s => s.restore());
    done();
  });

  it("should render <HomePage />", () => {
    component = renderer.create(<HomePage {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });


  it("should make a call to fetch rebates when the component is mounted and updates the rebates in state", () => {
    expect(stubs[1].calledOnce).toEqual(true); // Fetch call happens
    expect(equal(component.state().rebates, HomePage.prototype.initRebates)).toEqual(false); // rebates update
  });

  it("should format number to two decimal number when handleOnInputBlur is called with a valid value", () => {
    component.instance().handleOnInputBlur("Incentives", "122233");
    expect(component.state().rebates[0].amount).toEqual("122,233.00");
  });

  it("should format number to empty when handleOnInputBlur is called with an invalid value", () => {
    component.instance().handleOnInputBlur("Incentives", "Something");
    expect(component.state().rebates[0].amount).toEqual("");
  });

  it("should update the corresponding value when handleOnInputChange is called with any value", () => {
    component.instance().handleOnInputChange("Incentives", "Something");
    expect(component.state().rebates[0].amount).toEqual("Something");
  });

  it("should add the dealer rebate when handleOnAddDealerRebate is called", () => {
    expect(component.state().rebates[2].subElements.length).toEqual(3);
    component.instance().handleOnAddDealerRebate();
    expect(component.state().rebates[2].subElements.length).toEqual(4);
  });

  it("should remove the dealer rebate at a particular when handleOnRemoveDealerRebate is called", () => {
    expect(component.state().rebates[2].subElements.length).toEqual(3);
    component.instance().handleOnRemoveDealerRebate(1);
    expect(component.state().rebates[2].subElements.length).toEqual(2);
  });

  it("should post data and call callbacks when there are no validation errors and save button is clicked", () => {
    component.instance().save();

    expect(stubs[0].calledOnce).toEqual(true);
  });
});
