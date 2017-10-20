/** Edit Taxes -- Product Category Tax Setup Tab Content **/
import React from "react";
import PropTypes from "prop-types";

const ProductCategoryTaxSetup = () => {
  return (
    <div className="row" id="edit-tax-product-category-setup">
      <div className="nav-tabs-content">
        <strong className="text">Following are the products available.</strong>
        <table className="table product-category-tax-setup-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Tax if cap</th>
              <th>Tax if DIA</th>
              <th>CRT</th>
            </tr>
          </thead>
          <tbody>
            <strong> No Products available</strong>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProductCategoryTaxSetup.propTypes = {
  data: PropTypes.array
};

export default ProductCategoryTaxSetup;
