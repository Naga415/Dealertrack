import React from "react";
import renderer from "react-test-renderer";
import EditTaxProfile from "../edit-tax-profile";

describe("EditTaxProfile", () => {
  it("renders <EditTaxProfile />", () => {
    const props = {
      htmlId: "EditTaxProfile",
      name: "Edit Taxes",
      noTaxes: false,
      state: "NY",
      zipcode: "11042",
      isDisabled: false,
      actions: {}
    };

    const component = renderer.create(<EditTaxProfile {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
