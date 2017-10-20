'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import DealHeader from './DealHeader/DealHeader';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import DealActionBar from '../../molecules/DealActionBar/DealActionBar';

class Header extends React.PureComponent {
  showHideGrossProfit = () => {
    this.props.updateGrossDisplayStatus(!this.props.showGrossProfit);
  }

  print = () => {
    window.print();
  }

  getActionMenu = () => {
    return [
      { label: 'Show gross profit', disabled: this.props.showGrossProfit, header: false, onClick: null, onSelect: this.showHideGrossProfit },
      { label: "Hide gross profit", disabled: !this.props.showGrossProfit, header: false, onClick: null, onSelect: this.showHideGrossProfit },
      { label: '', divider: true }
    ];
  }

  render() {
    return (
      <Grid className='deal-header'>
        <Row className="show-grid">
          <Col xs={10} className="deal-header__header-col">
            <strong>DESKING</strong>
            <DealHeader zipcode="66201" htmlId="DealHeader" />
          </Col>
          <Col xs={2} className="deal-header__actionbar-col">
            <DealActionBar htmlId="DealActionBar" actionDropdown={this.getActionMenu()} print={this.print} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Header.propTypes = {
  htmlId: PropTypes.string,
  showGrossProfit: PropTypes.bool,
  updateGrossDisplayStatus: PropTypes.func
};

export default Header;
