import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Checkbox extends Component{
  onChange = (e) => {
    this.props.onChange(e.target.checked);
  }

  render(){
    const { name, label, checked, disabled } = this.props;

    return (<div className="checkbox">
      <label htmlFor={name}>
        <input
          name={name}
          type="checkbox"
          disabled={!!disabled}
          checked={checked}
          onChange={this.onChange}/>{label}
      </label>
    </div>);
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
