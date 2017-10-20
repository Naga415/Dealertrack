import React from "react";
import PropTypes from "prop-types";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Label from "@coxautokc/fusion-ui-components/lib/internal/Label";
import InputGroup from "react-bootstrap/lib/InputGroup";

/**
 * Select input control. Wraps the full Form group including
 * the Label, Control, and helpText. SelectInput handles its own
 * required validation but can be overridden by passing in error on props.
 */
class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  getError = value => {
    const { required, error, label } = this.props;
    if (error) {
      return error;
    } else if (value === "" && required) {
      return label ? `${label} is required` : "Field is required";
    } else {
      return "";
    }
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ error: this.getError(value) }, () => {
      this.props.onChange({ target: { name, value } }, !this.getError(value));
    });
  };

  onBlur = event => {
    this.setState({ error: this.getError(event.target.value) });
  };

  getFormControl = () => {
    const {
      displayPlaceholder,
      htmlId,
      label,
      name,
      options,
      value,
      disabled,
      ...props
    } = this.props;

    let placeholder = props.placeholder;
    const arr = [];

    if (!placeholder && label) {
      placeholder = "Select " + label;
    } else if (!placeholder && !label) {
      placeholder = "Select";
    }

    let count = 0;
    for (const keys in options) {
      const locarr = [];
      for (let i = 0; i < options[keys].length; i++) {
        locarr.push(
          <option key={`value-${keys}-${i}`} value={options[keys][i].feeId} label={options[keys][i].feeType}>
            {options[keys][i].feeType}
          </option>
        );
      }
      count++;
      arr.push(
        <optgroup key={`label-${count}`} label={keys}>
          {locarr}
        </optgroup>
      );
    }

    return (
      <FormControl
        className="selectInput"
        id={htmlId}
        name={name}
        componentClass="select"
        value={value}
        onChange={this.onChange}
        disabled={disabled}
        onBlur={this.onBlur}
      >
        {displayPlaceholder && <option value="">{placeholder}</option>}
        {arr}
      </FormControl>
    );
  };

  render() {
    const {
      className,
      displayLabel,
      htmlId,
      label,
      required,
      children
    } = this.props;
    const { error } = this.state;

    return (
      <FormGroup
        className={className}
        validationState={error ? "error" : null}
        controlId={htmlId}
      >
        {displayLabel && (
          <Label
            className={className}
            required={required}
            htmlId={htmlId + "-label"}
          >
            {label}
          </Label>
        )}
        {children ? (
          <InputGroup>
            {this.getFormControl()}
            {children}
          </InputGroup>
        ) : (
          this.getFormControl()
        )}
        {error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}

SelectInput.propTypes = {
  /** Any children to be passed through. */
  children: PropTypes.node,

  /** Appended to the FormGroup. */
  className: PropTypes.string,

  /** Set to true to disable the selectInput. */
  disabled: PropTypes.bool,

  /** Displays label if set to true. */
  displayLabel: PropTypes.bool,

  /** Hides placeholder if set to false. */
  displayPlaceholder: PropTypes.bool,

  /** String to display when error occurs. */
  error: PropTypes.string,

  /** Globally unique, descriptive ID. Used for automated testing. */
  htmlId: PropTypes.string.isRequired,

  /** Label text that shows above the select box. */
  label: PropTypes.string,

  /** FormControl name. */
  name: PropTypes.string.isRequired,

  /** onChange callback. Called with <code>cb(event, isValid)</code>. Check isValid to determine if the control is in error. */
  onChange: PropTypes.func.isRequired,

  /** An array of options as key value pairs: <code>[{value:'1', label:'option 1'}]</code> or values: <code>[{value:'1'}]</code>. */
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,

  /** Select box placeholder text that is displayed when no value is selected. Defaults to Select + label if empty. */
  placeholder: PropTypes.string,

  /** Perform validation on blur and mark field as required with asterisk if true. */
  required: PropTypes.bool,

  /** The value of the selected item. */
  value: PropTypes.string
};

SelectInput.defaultProps = {
  displayLabel: true,
  displayPlaceholder: true
};

export default SelectInput;
