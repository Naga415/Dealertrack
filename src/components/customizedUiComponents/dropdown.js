import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const Dropdown = props => {
  const { name, label, colWidth } = props;
  return (
    <div className={!colWidth ? "col-xs-12 form-group-taxes" : "col-xs-10 form-group-taxes"}>
      {label && <label htmlFor={name}>{label}</label>}
      <Select {...props} />
    </div>
  );
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  colWidth: PropTypes.bool
};

export default Dropdown;
