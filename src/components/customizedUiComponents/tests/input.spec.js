import React from "react";
import renderer from "react-test-renderer";
import Input from "../input";

const onChange = jest.fn();

describe("Input", () => {
  it("renders <Input />", () => {
    const props = {
      htmlId: "Input",
      name:"Input Test",
      label: "Input Label",
      value:"Input Value",
      disabled: false,
      addOnIndentation: "test",
      addOnClassName: "test1",
      onChange: () =>{onChange;}, 
      actions: {}
    };

    const component = renderer.create(<Input {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
