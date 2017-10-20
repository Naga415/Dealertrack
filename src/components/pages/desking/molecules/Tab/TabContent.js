'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TabContent extends React.PureComponent {
  render() {
    return (
      <div id={this.props.htmlId} className='tab__container__content'>
        {this.props.children}
      </div>
    );
  }
}
TabContent.defaultProps = {
  isDefault: false
};

TabContent.propTypes = {
  children: PropTypes.node,
  htmlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default TabContent;
