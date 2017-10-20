'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import ActionBar from '@coxautokc/fusion-ui-components/lib/ActionBar';
import IconPrint from '@coxautokc/fusion-ui-components/lib/Icons/IconPrint';
import CardDropdownMenu from '@coxautokc/fusion-ui-components/lib/internal/CardDropdownMenu';

// eslint-disable-next-line react/prefer-stateless-function
class DealActionBar extends React.PureComponent {
  render() {
    return (
      <div id={this.props.htmlId} className='deal-action-bar'>
        <ActionBar htmlId={`${this.props.htmlId}ActionBar`}>
          <ActionBar.Item
            label=""
            name="printActionBar"
            icon={<IconPrint />}
            responsiveClasses={{ icon: '', label: 'hidden-xs' }}
            actionDisplay="none"
            actionPosition="staticTab"
            onClick={this.props.print} />
        </ActionBar>
        {this.props.actionDropdown ? <CardDropdownMenu htmlId={`${this.props.htmlId}CardDropdownMenu`} actionDropdown={this.props.actionDropdown} /> : null}
      </div >
    );
  }
}

DealActionBar.propTypes = {
  htmlId: PropTypes.string,
  actionDropdown: PropTypes.array,
  print: PropTypes.func
};

export default DealActionBar;
