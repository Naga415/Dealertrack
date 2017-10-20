'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class ReadOnly extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    return (
      <div className="read-only">
        <ControlLabel className="read-only__label">
          {this.props.label}
        </ControlLabel>
        <div className="read-only__value">
          {this.props.value || this.props.default}
        </div>
      </div>
    );
  }
}
ReadOnly.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  stack: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  default: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])

};

export default ReadOnly;
