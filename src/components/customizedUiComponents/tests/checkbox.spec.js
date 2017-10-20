import React from "react";
import renderer from "react-test-renderer";
import Checkbox from "../checkbox";

const onChange = jest.fn();

describe("Checkbox", () => {
  it("renders <Checkbox />", () => {
    const props = {
      htmlId: "Checkbox",
      name: "Checbox Name",
      label: "Dummy Label",
      checked: false,
      disabled: false,
      onChange: () => { onChange;},
      actions: {}
    };

    const component = renderer.create(<Checkbox {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
