import React from "react";
import renderer from "react-test-renderer";
import Tooltip from "./tooltip";

describe("Tooltip", () => {
  it("renders <Tooltip />", () => {
    const props = {
      htmlId: "Tooltip",
      tooltipText:"Tooltip Text",
      actions: {}
    };

    const component = renderer.create(<Tooltip {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
