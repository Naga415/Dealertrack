/** Edit Taxes -- Tax Setup Tab Content **/
import React from "react";
import PropTypes from "prop-types";
import Input from "./customizedUiComponents/input";
import Checkbox from "./customizedUiComponents/checkbox";
import Dropdown from "./customizedUiComponents/dropdown";
import {
  retailTaxMethodOptions,
  retailTradeCreditOptions,
  leaseTradeCreditOptions,
  leaseTaxMethodOptions,
  monthlyTaxMethodOptions,
  capReductionTaxMethodOptions
} from "../constants";
import Col from "react-bootstrap/lib/Col";
import Tooltip from "./customizedUiComponents/tooltip/tooltip";

export default class TaxSetup extends React.Component {
  getOnChangeHandler = input => val => this.props.updateInput(input, val);

  render() {
    const { isDisabled, name } = this.props;

    return (
      <div className="tax-setup-container" id="edit-tax-setup">
        <div className="row retail-row">
          <div id="taxes-retail-flat" className="col-xs-3">
            <Input
              name="retail-flat"
              label="Retail Flat"
              value={this.props["retailFlat"]}
              disabled={isDisabled}
              addOnClassName="fa fa-usd"
              addOnIndentation="left"
              onChange={this.getOnChangeHandler("retailFlat")}
            />
          </div>
          <div id="taxes-retail-trade-credit" className="col-xs-5">
            <Dropdown
              name="retail-trade-credit"
              label="Retail-Trade Credit"
              options={retailTradeCreditOptions}
              value={this.props["retailTradeCredit"]}
              disabled={isDisabled}
              onChange={this.getOnChangeHandler("retailTradeCredit")}
            />
          </div>
          <Col xs={4} sm={3} id="taxes-retail-tarde-credit-amount">
            <Input
              name="trade-credit-amountt"
              label="Trade Credit Amount"
              value={this.props["retailTradeCreditAmount"]}
              disabled={isDisabled}
              addOnClassName="fa fa-usd"
              addOnIndentation="left"
              onChange={this.getOnChangeHandler("retailTradeCreditAmount")}
            />
          </Col>
        </div>
        <div className="row">
          <div id="taxes-retail-tax-percent" className="col-xs-3">
            <Input
              name="retail-tax-percent"
              label="Retail Tax"
              value={this.props["retailTaxPercent"]}
              disabled={isDisabled}
              addOnClassName="fa fa-percent"
              addOnIndentation="right"
              onChange={this.getOnChangeHandler("retailTaxPercent")}
            />
          </div>
          <div id="taxes-retail-tax-method" className="col-xs-5">
            <Dropdown
              name="retail-tax-method"
              label="Method"
              options={retailTaxMethodOptions}
              value={this.props["retailTaxMethod"]}
              disabled={isDisabled}
              colWidth={true}
              onChange={this.getOnChangeHandler("retailTaxMethod")}
            />
            <div id="taxes-retail-tooltip" className="col-xs-1">
              <span>
                <Tooltip tooltipText="Retail tax Method Options" />
              </span>
            </div>
          </div>
          <div className="col-xs-4">Apply to</div>
          <div className="row lease-row">
            <Col xs={1} id="taxes-retail-tax-fees">
              <Checkbox
                name="retail-tax-fees"
                label="Fees"
                checked={this.props["retailTaxFees"]}
                onChange={this.getOnChangeHandler("retailTaxFees")}
              />
            </Col>
            <div id="taxes-retail-tax-products" className="col-xs-1">
              <Checkbox
                name="retail-tax-products"
                label="Products"
                checked={this.props["retailTaxProducts"]}
                onChange={this.getOnChangeHandler("retailTaxProducts")}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div id="taxes-capitalize" className="col-xs-2">
            <Checkbox
              name="capitalize"
              label="Capitalize"
              disabled={isDisabled}
              checked={this.props["capitalize"]}
              onChange={this.getOnChangeHandler("capitalize")}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div id="taxes-lease-flat" className="col-xs-3">
            <Input
              name="lease-flat"
              label="Lease Flat"
              value={this.props["leaseFlat"]}
              disabled={isDisabled}
              addOnClassName="fa fa-usd"
              addOnIndentation="left"
              onChange={this.getOnChangeHandler("leaseFlat")}
            />
          </div>
          <div id="taxes-lease-trade-credit" className="col-xs-5">
            <Dropdown
              name="lease-trade-credit"
              label="Lease Trade Credit"
              options={leaseTradeCreditOptions}
              value={this.props["leaseTradeCredit"]}
              disabled={isDisabled}
              onChange={this.getOnChangeHandler("leaseTradeCredit")}
            />
          </div>
          <Col xs={3} md={3} id="taxes-lease-trade-credit-amount">
            <Input
              name="trade-credit-amountt"
              label="Trade Credit Amount"
              value={this.props["leaseTradeCreditAmount"]}
              disabled={isDisabled}
              addOnClassName="fa fa-usd"
              addOnIndentation="left"
              onChange={this.getOnChangeHandler("leaseTradeCreditAmount")}
            />
          </Col>
        </div>
        <div className="row lease-row">
          <div id="taxes-lease-tax-percent" className="col-xs-3">
            <Input
              name="lease-tax-percent"
              label="Lease Tax"
              value={this.props["leaseTaxPercent"]}
              disabled={isDisabled}
              addOnClassName="fa fa-percent"
              addOnIndentation="right"
              onChange={this.getOnChangeHandler("leaseTaxPercent")}
            />
          </div>
          <div id="taxes-lease-tax-method" className="col-xs-5">
            <Dropdown
              name="lease-tax-method"
              label="Method"
              options={leaseTaxMethodOptions}
              value={this.props["leaseTaxMethod"]}
              disabled={isDisabled}
              colWidth={true}
              onChange={this.getOnChangeHandler("leaseTaxMethod")}
            />
            <div id="taxes-lease-tooltip" className="col-xs-1">
              <span>
                <Tooltip tooltipText="Lease tax Method Options" />
              </span>
            </div>
          </div>
          <div className="col-xs-4">Apply to</div>
          <div className="row">
            <Col xs={1} id="taxes-lease-fees">
              <Checkbox
                name="lease-tax-fees"
                label="Fees"
                checked={this.props["leaseTaxFees"]}
                onChange={this.getOnChangeHandler("leaseTaxFees")}
              />
            </Col>
            <div id="taxes-lease-products" className="col-xs-1">
              <Checkbox
                name="lease-tax-products"
                label="Products"
                checked={this.props["leaseTaxProducts"]}
                onChange={this.getOnChangeHandler("leaseTaxProducts")}
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="row">
          <Col xs={3} id="taxes-mut-percent">
            <Input
              name="monthly-use-tax-percent"
              label="Monthly Use Tax"
              value={this.props["monthlyUseTaxPercent"]}
              disabled={isDisabled}
              addOnClassName="fa fa-percent"
              addOnIndentation="right"
              onChange={this.getOnChangeHandler("monthlyUseTaxPercent")}
            />
          </Col>
          <div id="taxes-mut-method" className="col-xs-5">
            <Dropdown
              name="monthly-tax-method"
              label="Method"
              options={monthlyTaxMethodOptions}
              value={this.props["monthlyTaxMethod"]}
              disabled={isDisabled}
              colWidth={true}
              onChange={this.getOnChangeHandler("monthlyTaxMethod")}
            />
            <div id="taxes-mut-tooltip" className="col-xs-1">
              <span>
                <Tooltip tooltipText="Monthly tax Method Options" />
              </span>
            </div>
          </div>
          <div className="col-xs-4">Apply to</div>
          <div className="row">
            <Col xs={1} id="taxes-mut-fees">
              <Checkbox
                name="monthly-tax-fees"
                label="Fees"
                checked={this.props["monthlyTaxFees"]}
                onChange={this.getOnChangeHandler("monthlyTaxFees")}
              />
            </Col>
            <Col xs={1} id="taxes-mut-products">
              <Checkbox
                name="monthly-tax-products"
                label="Products"
                checked={this.props["monthlyTaxProducts"]}
                onChange={this.getOnChangeHandler("monthlyTaxProducts")}
              />
            </Col>
          </div>
        </div>
        <div className="row">
          <Col xs={3} id="taxes-crt-percent">
            <Input
              name="cap-reduction-tax-percent"
              label="Cap Reduction Tax"
              value={this.props["capReductionTaxPercent"]}
              disabled={isDisabled}
              addOnClassName="fa fa-percent"
              addOnIndentation="right"
              onChange={this.getOnChangeHandler("capReductionTaxPercent")}
            />
          </Col>
          <div id="taxes-crt-method" className="col-xs-5">
            <Dropdown
              name="cap-reduction-tax-method"
              label="Method"
              options={capReductionTaxMethodOptions}
              value={this.props["capReductionTaxMethod"]}
              disabled={isDisabled}
              colWidth={true}
              onChange={this.getOnChangeHandler("capReductionTaxMethod")}
            />
            <div id="taxes-crt-tooltip" className="col-xs-1">
              <span>
                <Tooltip tooltipText="Cap Reduction tax Method Options" />
              </span>
            </div>
          </div>
          <div className="col-xs-4">Apply to</div>
          <div className="row">
            <Col xs={1} id="taxes-crt-fees">
              <Checkbox
                name="cap-tax-fees"
                label="Fees"
                checked={this.props["capTaxFees"]}
                onChange={this.getOnChangeHandler("capTaxFees")}
              />
            </Col>
            <Col xs={1} id="taxes-crt-products">
              <Checkbox
                name="cap-tax-products"
                label="Products"
                checked={this.props["capTaxProducts"]}
                onChange={this.getOnChangeHandler("capTaxProducts")}
              />
            </Col>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <label className="boldify" htmlFor={name}>
              Total: $ 0
            </label>
          </div>
          <Col xs={6} md={6}>
            <label
              className="boldify col-xs-10 col-xs-offset-10 sales"
              htmlFor={name}
            >
              Sales $ 0 | MUT $ 0 |CRT $ 0
            </label>
          </Col>
        </div>
      </div>
    );
  }
}

TaxSetup.propTypes = {
  capitalize: PropTypes.bool,
  capReductionTaxMethod: PropTypes.object,
  capReductionTaxPercent: PropTypes.string,
  capTaxFees: PropTypes.bool,
  capTaxProducts: PropTypes.bool,
  isDisabled: PropTypes.bool,
  leaseFlat: PropTypes.string,
  leaseTaxFees: PropTypes.bool,
  leaseTaxMethod: PropTypes.object,
  leaseTaxPercent: PropTypes.string,
  leaseTaxProducts: PropTypes.bool,
  leaseTradeCredit: PropTypes.object,
  leaseTradeCreditAmount: PropTypes.string,
  monthlyTaxFees: PropTypes.bool,
  monthlyTaxMethod: PropTypes.object,
  monthlyTaxProducts: PropTypes.bool,
  monthlyUseTaxPercent: PropTypes.string,
  name: PropTypes.string,
  retailFlat: PropTypes.string,
  retailTaxFees: PropTypes.bool,
  retailTaxMethod: PropTypes.object,
  retailTaxPercent: PropTypes.string,
  retailTaxProducts: PropTypes.bool,
  retailTradeCredit: PropTypes.object,
  retailTradeCreditAmount: PropTypes.string,
  updateInput: PropTypes.func
};
