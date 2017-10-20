import React from "react";
import renderer from "react-test-renderer";
import FeeTaxSetup from "../fee-tax-setup";

describe("Fee Tax Setup specs", () => {
  const props = {
    htmlId: "FeeTaxSetup",
    data: [{ feeType: "test1" }, { feeType: "test2" }],
    actions: {}
  };

  it("renders <FeeTaxSetup />", () => {
    const component = renderer.create(<FeeTaxSetup {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
