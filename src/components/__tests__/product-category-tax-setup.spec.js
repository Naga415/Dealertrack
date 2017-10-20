import React from "react";
import renderer from "react-test-renderer";
import ProductCategoryTaxSetup from "../product-category-tax-setup";

describe("Product Category Tax Setup specs", () => {
  const props = {
    htmlId: "ProductCategoryTaxSetup",
    data: [{ feeType: "test1" }, { feeType: "test2" }],
    actions: {}
  };

  it("renders <ProductCategoryTaxSetup />", () => {
    const component = renderer.create(<ProductCategoryTaxSetup {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
