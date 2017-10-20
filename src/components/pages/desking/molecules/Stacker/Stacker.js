'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Stackable from './Stackable';


class Stacker extends React.Component {
  constructor(){
    super();
  }



  getStackedComponents = () => {
    const children = React.Children.toArray(this.children);
    return children.sort((child1,child2) => child1.stackIndex - child2.stackIndex);
  }

  render() {
    return (<div>{this.props.stack ? this.getStackedComponents() : this.props.children}</div>);
  }
}

Stacker.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  stack: PropTypes.bool
};

Stacker.Stackable = Stackable;

export default Stacker;
