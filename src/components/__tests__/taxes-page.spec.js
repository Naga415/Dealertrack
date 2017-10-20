import React from "react";
import renderer from "react-test-renderer";
import TaxesPage from "../taxes-page";
import extend from "lodash/extend";
import { initialState as taxSetupProps } from "../../reducers/tax-setup-reducers";

describe("TaxesPage", () => {
  it("renders <TaxesPage />", () => {
    const props = {
      htmlId: "TaxesPage",
      currentTab: 1,
      noTaxes: false,
      updateEditTaxProfileInput: () => {},
      updateCurrentTab: () => {},
      updateTaxSetupInput: () => {},
      actions: {},
      fetchTaxData: () => {},
      fetchFeeTaxData: () => {},
      taxSetup: extend({}, taxSetupProps)
    };

    const component = renderer.create(<TaxesPage {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
