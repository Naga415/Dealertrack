"use strict";
import React from "react";
import PropTypes from "prop-types";
import Stacker from "../../../../molecules/Stacker/Stacker";
import Input from "../../../../molecules/Input/Input";
import ReadOnly from "../../../../molecules/ReadOnly/ReadOnly";
import Scenario from "../../../../../../../models/Scenario";
import { Taxes } from "@coxautokc/taxes";
import { Fees } from "@coxautokc/fees";
import { Rebates } from '@coxautokc/rebates';

class Lease extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showFeesModal: false,
      showRebatesModal: false,
      showTaxesModal: false
    };
  }

  onDetailsChange = e => {
    const { name, value } = e.target;
    this.props.actions.deal.updateScenarioDetails(this.props.scenario.id, {
      name,
      value
    });
  };

  onTradeChange = e => {
    const { name, value } = e.target;
    this.props.actions.deal.updateScenarioTrade(this.props.scenario.id, {
      name,
      value
    });
  };

  onClick = () => {};

  // Begin: Integration for Fees, Rebates, Taxes

  openCloseModal = modalName => {
    const tmp = {};
    this.setState(function(prevState) {
      tmp[modalName] = !prevState[modalName];
      return Object.assign({}, prevState, tmp);
    });
  };

  onDialogChange = (name, value) => {
    this.props.actions.deal.updateScenarioDetails(this.props.scenario.id, {
      name,
      value
    });
  };

  // End: Integration for Fees, Rebates, Taxes

  render() {
    return (
      <div className="deal-type-inputs">
        <Stacker>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="MSRP"
              name="msrp"
              value={this.props.scenario.details.msrp}
              label="MSRP"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={1}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="MilesPerYear"
              name="milesPerYear"
              value={this.props.scenario.details.milesPerYear}
              label="Miles Per Year"
              onClick={this.onClick}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={13}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="SellingPrice"
              name="sellingPrice"
              value={this.props.scenario.details.sellingPrice}
              label="Selling Price"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={2}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="ExpectedMiles"
              name="expectedMiles"
              value={this.props.scenario.details.expectedMiles}
              label="Expected Miles"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={14}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="AddOns"
              name="addOns"
              value={this.props.scenario.details.addOns}
              label="Add-Ons"
              onClick={this.onClick}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={3}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="AmountPerMile"
              name="amountPerMile"
              value={this.props.scenario.details.amountPerMile}
              label="Amount Per Mile"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={15}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Fees"
              name="fees"
              value={this.props.scenario.details.fees}
              label="Fees"
              onClick={() => this.openCloseModal("showFeesModal")}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={4}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="SecurityDeposit"
              name="securityDeposit"
              value={this.props.scenario.details.securityDeposit}
              label="Security Deposit"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={16}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Taxes"
              name="taxes"
              value={this.props.scenario.details.taxes}
              label="Taxes"
              //eslint-disable-next-line
              onClick={() => this.openCloseModal("showTaxesModal")}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={5}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Allowance"
              name="allowance"
              value={this.props.scenario.trade.allowance}
              label="Trade Allowance"
              onChange={this.onTradeChange}
              onBlur={this.props.save}
              tabIndex={17}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Rebate"
              name="rebate"
              value={this.props.scenario.details.rebate}
              label="Rebate"
              onClick={() => this.openCloseModal("showRebatesModal")}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={6}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Payoff"
              name="payoff"
              value={this.props.scenario.trade.payoff}
              label="Trade Payoff"
              onChange={this.onTradeChange}
              onBlur={this.props.save}
              tabIndex={18}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Downpayment.0"
              name="downpayments.0"
              value={this.props.scenario.details.downpayments[0]}
              label="Down Payment"
              options={[{ label: "Percent" }, { label: "Dollar Amount" }]}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={7}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="ACV"
              name="acv"
              value={this.props.scenario.trade.acv}
              label="Trade ACV"
              onChange={this.onTradeChange}
              onBlur={this.props.save}
              tabIndex={19}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Rate"
              name="rate"
              value={this.props.scenario.details.rate}
              label="Rate %"
              options={[{ label: "Interest Rate" }, { label: "Money Factor" }]}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={8}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="GrossCapCost"
              name="grossCapCost"
              value={this.props.scenario.details.grossCapCost}
              label="Gross Cap Cost"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={20}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="Term"
              name="term"
              value={this.props.scenario.details.term}
              label="Term"
              options={[
                { label: "Monthly" },
                { label: "Bi-Weekly" },
                { label: "Weekly" },
                { label: "Semi-Annually" },
                { label: "Annually" }
              ]}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={9}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="CapCostReduction"
              name="capCostReduction"
              value={this.props.scenario.details.capCostReduction}
              label="Cap Cost Reduction"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={21}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="AcquisitionFee"
              name="acquisitionFee"
              value={this.props.scenario.details.acquisitionFee}
              label="Acquisition Fee"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={10}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="AdjustedCapCost"
              name="adjustedCapCost"
              value={this.props.scenario.details.adjustedCapCost}
              label="Adjusted Cap Cost"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={22}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="BaseResidual"
              name="baseResidual"
              value={this.props.scenario.details.baseResidual}
              label="Base Residual"
              options={[{ label: "Percent" }, { label: "Dollar Amount" }]}
              onClick={this.onClick}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={11}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="PaidByCustomer"
              name="paidByCustomer"
              value={this.props.scenario.details.paidByCustomer}
              label="Paid By Customer"
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={23}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <Input
              id="AdjustedResidual"
              name="adjustedResidual"
              value={this.props.scenario.details.adjustedResidual}
              label="Adj Residual"
              options={[{ label: "Percent" }, { label: "Dollar Amount" }]}
              onClick={this.onClick}
              onChange={this.onDetailsChange}
              onBlur={this.props.save}
              tabIndex={12}
            />
          </Stacker.Stackable>
          <Stacker.Stackable className="deal-type-inputs__stackable">
            <ReadOnly
              id="Subtotal"
              label="Subtotal"
              default="-"
              value={this.props.scenario.summary.subtotal}
            />
          </Stacker.Stackable>
        </Stacker>
        <Taxes
          name="taxes"
          //eslint-disable-next-line
          closeDialog={() => this.openCloseModal("showTaxesModal")}
          dialogStatus={this.state.showTaxesModal}
          populateValue={this.onDialogChange}
        />
        <Fees
          dealId={123}
          zipCode={123456}
          scenarioId={this.props.scenario.id}
          name="fees"
          //eslint-disable-next-line
          closeDialog={() => this.openCloseModal("showFeesModal")}
          dialogStatus={this.state.showFeesModal}
          populateValue={this.onDialogChange}
        />
        <Rebates
          name="rebate"
          //eslint-disable-next-line
          closeDialog={() => this.openCloseModal("showRebatesModal")}
          dialogStatus={this.state.showRebatesModal}
          populateValue={this.onDialogChange}
        />
      </div>
    );
  }
}

Lease.propTypes = {
  scenario: PropTypes.instanceOf(Scenario).isRequired,
  actions: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
};

export default Lease;
