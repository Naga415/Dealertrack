'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

class Input extends React.Component {
  shouldComponentUpdate(nextProps){
    return this.props.value!== nextProps.value;
  }

  render(){
    let label = <ControlLabel className="desking-input__text-label">{this.props.label}</ControlLabel>;
    if (this.props.options) {
      label = (
        <DropdownButton
          id={this.props.id} bsSize="small"
          className="desking-input__dropdown"
          bsStyle="link"
          title={this.props.label}>
          {this.props.options.map((option, index)=><MenuItem key={index} eventKey={`${index}`}>{option.label}</MenuItem>)}
        </DropdownButton>);
    }
    else if (this.props.onClick) {
      label = <Button className="desking-input__link-label" bsStyle="link" onClick={this.props.onClick}>{this.props.label}</Button>;
    }

    return (
      <div className="desking-input">
        <div className="desking-input__label">
          {label}
        </div>
        <FormControl
          id = {this.props.id}
          name={this.props.name}
          className="desking-input__value"
          type="number"
          inputMode="numeric"
          placeholder={this.props.label}
          value={this.props.value || ''}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          bsSize="small"
          readOnly={this.props.readOnly}
          tabIndex={this.props.tabIndex}
        />
      </div>
    );
  }
}

Input.propTypes = {
  id:PropTypes.string.isRequired,
  name:PropTypes.string,
  label:PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  tabIndex: PropTypes.number,
  readOnly: PropTypes.bool
};

export default Input;
