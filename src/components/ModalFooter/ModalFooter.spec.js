"use strict";
import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import ModalFooter from "./ModalFooter";
import 'jsdom-global/register';

const props = {
  cancel: sinon.spy(),
  displayResetBtn: true,
  modalName: "modalName",
  resetData: sinon.spy(),
  save: sinon.spy()
};

afterEach(() => {
  props.resetData.reset();
  props.save.reset();
  props.cancel.reset();
});

describe("ModalFooter specs", () => {
  it("renders <ModalFooter />", () => {
    const component = renderer.create(<ModalFooter {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("triggers cancel button when click", () => {
    const component = mount(<ModalFooter {...props} />);
    component.find("#modalName-modalCancel").simulate("click");
    expect(props.cancel.calledOnce).toEqual(true);
  });

  it("triggers save button when click", () => {
    const component = mount(<ModalFooter {...props} />);
    component.find("#modalName-modalSave").simulate("click");
    expect(props.save.calledOnce).toEqual(true);
  });

  it("refresh button not exists when pass false as displayResetBtn", () => {
    props["displayResetBtn"] = false;
    const component = mount(<ModalFooter {...props} />);
    expect(component.find(".fa .fa-refresh").exists()).toEqual(false);
  });
});
