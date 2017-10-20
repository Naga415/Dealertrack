'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import TabContent from './TabContent';
import Selectors from './Selectors';

// eslint-disable-next-line react/prefer-stateless-function
class Tab extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  setCurrentTab = () => {
    const nodes = React.Children.toArray(this.props.children);
    const selectedValue = this.props.selectedValue;
    const currentTab = nodes.find(function (element) {
      if (element.type === TabContent && element.props.label === selectedValue)
        return element;
    });
    return currentTab;
  };

  onChange = (event) => {
    this.props.onTabSelect(event.target.value);
    this.setCurrentTab();
  };

  buildSelectors = () => {

  };

  render() {
    return (
      <div className="tab" id={this.props.htmlId}>
        <div className="tab__selectors">
          <Selectors onChange={this.onChange} selectedValue={this.props.selectedValue} children={this.props.children}/>
        </div>
        <div className="tab__container">
          {this.setCurrentTab()}
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.node,
  htmlId: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};

export default Tab;
