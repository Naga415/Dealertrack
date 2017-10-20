import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
  constructor(props){
    super(props);

    this.initValue = "0";
    this.state = {
      formattedValue: this.initValue,
      errors: []
    };
  }

  componentWillReceiveProps(nextProps){
    if ((this.props.value === this.initValue) && 
    (nextProps.value !== this.initValue)){
      const formattedValue = this.formatValue(nextProps.value);
      this.setState({ formattedValue });
    }
  }

  onChange = (e) => {  
    const rawValue = e.target.value;
    this.props.onChange(rawValue);
    const errors = this.validateInput(rawValue);
    this.setState({
      formattedValue: rawValue, 
      // eslint-disable-next-line
      errors: errors
    });
  }

  onBlur = (e) => {
    const formattedValue = this.formatValue(e.target.value);
    this.setState({ formattedValue: formattedValue || e.target.value });
  }

  formatValue = (rawValue) => {
    // change value to the format "1,000,000.00"
    let formattedValue = parseFloat(rawValue.replace(/,/g, ""))
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    formattedValue === "NaN" && (formattedValue = rawValue);
    return formattedValue;
  }

  validateInput = (rawValue) => {
    if (this.props.addOnClassName.includes("fa-usd")){
      return this.validateCurrency(rawValue);
    } else if (this.props.addOnClassName.includes("fa-percent")){
      return this.validatePercent(rawValue);
    } else {
      return [];
    }
  }

  validateCurrency = (rawValue) => {
    const errors = [];
    const parsedValue = parseFloat(rawValue);    
    if (!parsedValue ||
      (parsedValue && rawValue.split('.').length !== 1 && rawValue.split('.')[1].length > 2)){
      errors.push('The data is invalid, Numeric values upto 2 decimals only');
    }
    if (parsedValue && (parsedValue < 0 || parsedValue > 99999.99)){
      errors.push('The value must be from $0 to $99,999.99');
    }     
    return errors;
  }

  validatePercent = (rawValue) => {
    const errors = [];
    const parsedValue = parseFloat(rawValue);    
    if (!parsedValue ||
    (parsedValue && rawValue.split('.').length !== 1 && rawValue.split('.')[1].length > 3)){
      errors.push('The data is invalid, Numeric values upto 3 decimals only');
    }
    if (parsedValue && (parsedValue < 0 || parsedValue > 999.999)){
      errors.push('The value must be from 0% to 999.999%');
    }     
    return errors;
  }

  render() {
    const {
      name,
      label,
      disabled,
      addOnIndentation,
      addOnClassName
    } = this.props;

    if (!addOnClassName) {
      return (
        <div className="form-group-taxes">
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type="text"
            className="form-control"
            disabled={!!disabled}
            value={this.state.formattedValue}
            onChange={this.onChange}
          />
        </div>
      );
    }

    return (
      <div className="form-group-taxes">
        <label htmlFor={name}>{label}</label>
        <div className="input-group">
          {addOnIndentation === "left" && (
            <span className="input-group-addon">
              <i className={addOnClassName} />
            </span>
          )}
          <input
            name={name}
            type="text"
            className={`form-control ${this.state.errors.length ? 'has-error' : ''}`}
            disabled={!!disabled}
            value={this.state.formattedValue}
            onChange={this.onChange}
          />
          {addOnIndentation === "right" && (
            <span className="input-group-addon">
              <i className={addOnClassName} />
            </span>
          )}
        </div>
        {
          this.state.errors.length ? 
            (<ul className="error-list">
              {this.state.errors.map((e, i) => (<li key={"error_" + i} className="error-list-item">{e}</li>))}
            </ul>)
            : ''
        }
      </div>
    );
  }
}

Input.propTypes = {
  addOnClassName: PropTypes.string,
  addOnIndentation: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
