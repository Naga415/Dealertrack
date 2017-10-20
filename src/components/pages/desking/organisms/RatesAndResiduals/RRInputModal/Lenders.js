'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
// eslint-disable-next-line react/prefer-stateless-function
class Lenders extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  setSelectedLender = (indexStr)=>{
    const index = parseInt(indexStr, 10);
    this.props.setSelectedLender(this.props.lenders[index]);
  }

  render() {
    return (
      <div>
        <DropdownButton
          id='Lenders'
          bsSize="small"
          bsStyle="link"
          title={this.props.selectedLender}>
          {this.props.lenders.map((lender, index)=><MenuItem id={`LenderMenuItem${index}`} onSelect={this.setSelectedLender} key={index} eventKey={`${index}`}>{lender}</MenuItem>)}
        </DropdownButton>
      </div>
    );
  }
}

Lenders.propTypes = {
  lenders:  PropTypes.arrayOf(PropTypes.string),
  selectedLender: PropTypes.string,
  setSelectedLender: PropTypes.func
};

export default Lenders;
