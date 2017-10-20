import React from "react";
import renderer from "react-test-renderer";
import extend from "lodash/extend";
import TaxSetup from "../tax-setup";
import { initialState as taxSetupProps } from "../../reducers/tax-setup-reducers";

describe("TaxSetup", () => {
  it("renders <TaxSetup />", () => {
    const props = extend({}, taxSetupProps, {
      htmlId: "TaxSetup",
      isDisabled: false,
      name: "taxSetup",
      actions: {}
    });

    const component = renderer.create(<TaxSetup {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});


