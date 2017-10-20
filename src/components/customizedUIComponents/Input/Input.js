import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

export default function Input({
  label,
  displayLabel,
  htmlId,
  addOnClassName,
  ...props
}) {
  return (
    <div className="form-group">
      {displayLabel && <label htmlFor={name}>{label}</label>}
      <div className="input-group">
        {!!addOnClassName && (
          <span className="input-group-addon">
            <i className={addOnClassName} />
          </span>
        )}
        <input id={htmlId} type="text" className="form-control" {...props} />
      </div>
    </div>
  );
}

Input.propTypes = {
  addOnClassName: PropTypes.string,
  disabled: PropTypes.bool,
  displayLabel: PropTypes.bool,
  htmlId: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

Input.default = {
  displayLabel: false
};
