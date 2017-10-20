'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Stackable extends React.PureComponent {
  render () {
    const className = this.props.stack ? "stackable--stack" : this.props.className;
    return <div className={className}>{this.props.children}</div>;
  }
}
Stackable.propTypes = {
  stackIndex: PropTypes.number,
  className: PropTypes.string,
  stack: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};
export default Stackable;
