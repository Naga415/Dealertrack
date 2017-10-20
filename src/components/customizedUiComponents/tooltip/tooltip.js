import React from 'react';
import PropTypes from 'prop-types';
import "./tooltip.scss";

export default function Tooltip(props){
  return (
    <div className="taxestooltip">
      <i className="fa fa-info-circle"/>
      <span className="tooltiptext">{props.tooltipText}</span>
    </div>
  );
}

Tooltip.propTypes = {
  tooltipText: PropTypes.string,
};

