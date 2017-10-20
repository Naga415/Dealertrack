import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

export default function Input({
  label,
  displayLabel,
  htmlId,
  addOnIndentation,
  addOnClassName,
  error,
  ...props
}) {
  return (
    <div className={`form-group ${error && 'has-error'}`}>
      {displayLabel && <label htmlFor={name}>{label}</label>}
      <div className="input-group">
        {!!addOnClassName &&
          addOnIndentation === "left" && (
            <span className="input-group-addon">
              <i className={addOnClassName} />
            </span>
          )}
        <input id={htmlId} name={name} type="text" className="form-control" {...props} />
        {error && <span className="form-control-feedback remove-background-color"/>}
      </div>
    </div>
  );
}

Input.propTypes = {
  addOnClassName: PropTypes.string,
  addOnIndentation: PropTypes.string,
  disabled: PropTypes.bool,
  displayLabel: PropTypes.bool,
  htmlId: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool
};

Input.default = {
  displayLabel: false
};
