import React from "react";
import PropTypes from "prop-types";
import Checkbox from "./customizedUiComponents/checkbox";
import Dropdown from "./customizedUiComponents/dropdown";
import { profileOptions } from "../constants";
import Col from "react-bootstrap/lib/Col";

export default class EditTaxProfile extends React.Component {
  getOnChangeHandler = input => val => this.props.updateInput(input, val);

  render() {
    const { name, noTaxes, state, zipcode, isDisabled } = this.props;
    return (
      <div className="row" id="edit-tax-profile">
        <Col xs={4} md={3} id="noTaxes" className="col-xs-offset-half">
          <Checkbox
            name="noTaxes"
            label="No Taxes"
            checked={noTaxes}
            onChange={this.getOnChangeHandler("noTaxes")}
          />
        </Col>
        <div id="taxesProfile" className="col-xs-5">
          <Dropdown
            name="profile"
            label="Profile"
            options={profileOptions}
            value={this.props["profile"]}
            disabled={isDisabled}
            onChange={this.getOnChangeHandler("profile")}
          />
        </div>
        <div id="taxes-state-zipcode" className="col-xs-2">
          <label className="boldify zipcode-text" htmlFor={name}>
            {state},{zipcode}
          </label>
        </div>
      </div>
    );
  }
}

EditTaxProfile.propTypes = {
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  noTaxes: PropTypes.bool,
  profile: PropTypes.object,
  state: PropTypes.string,
  updateInput: PropTypes.func,
  zipcode: PropTypes.string
};
