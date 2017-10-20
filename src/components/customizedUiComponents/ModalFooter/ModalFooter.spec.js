import React from "react";
import renderer from "react-test-renderer";
import ModalFooter from "./ModalFooter";

const resetData = jest.fn();
const save = jest.fn();
const cancel = jest.fn(); 

describe("ModalFooter", () => {
  it("renders <ModalFooter />", () => {
    const props = {
      htmlId: "ModalFooter",
      modalName: "Test Name",
      displayResetBtn: false,
      resetData: () => { resetData;},
      save:  () => { save;},
      cancel:  () => { cancel;},
      isDisabled:false,
      actions: {}
    };

    const component = renderer.create(<ModalFooter {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
