'use strict';
import React from 'react';
import RadioButtonList from '@coxautokc/fusion-ui-components/lib/RadioButtonList';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Selectors extends React.PureComponent {
  shouldComponentUpdate(nextProps){
    return this.props.selectedValue!== nextProps.selectedValue;
  }

  render() {
    const selectors = [];
    React.Children.forEach(this.props.children, function (element) {
      selectors.push({
        value: element.props.label,
        label: element.props.label
      });
    }, this);

    return (
      <RadioButtonList
        className="primary"
        displayLabel={false}
        inline
        required
        htmlId="DealType"
        name="DealType"
        label="DealType"
        onChange={this.props.onChange}
        value={this.props.selectedValue}
        options={selectors}
      />
    );
  }
}
Selectors.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired
};
export default Selectors;
