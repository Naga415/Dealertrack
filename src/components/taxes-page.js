import React from 'react';
import PropTypes from "prop-types";
import EditTaxesProfile from './edit-tax-profile';
import TaxSetup from './tax-setup';
import FeeTaxSetup from './fee-tax-setup';
import ProductCategoryTaxSetup from './product-category-tax-setup';
import { TaxesPageTabs } from '../constants';

export default class TaxesPage extends React.Component{
  componentDidMount(){
    this.props.fetchTaxData();
    this.props.fetchFeeTaxData();
  }

  getOnTabClickHandler = (tab) => () => this.props.updateCurrentTab(tab)

  renderCurrentTab = () => {
    let content = (<div/>);
    switch (this.props.currentTab){
      case TaxesPageTabs["tax-setup"]:
        content = ( <TaxSetup
          {...this.props.taxSetup}
          isDisabled={this.props.noTaxes}
          updateInput={this.props.updateTaxSetupInput} /> );
        break;
      case TaxesPageTabs["fee-tax-setup"]:
        content = ( <FeeTaxSetup
          {...this.props.feeTaxSetup}
          isDisabled={this.props.noTaxes} /> );
        break;
      case TaxesPageTabs["product-category-tax-setup"]:
        content = ( <ProductCategoryTaxSetup
          isDisabled={this.props.noTaxes} /> );
        break;

      default:
        break;
    }
    return content;
  }

  render(){
    const {
      currentTab,
      noTaxes,
      updateEditTaxProfileInput
    } = this.props;
    return (
      <div id="edit-taxes-page">
        <div>
          <EditTaxesProfile
            {...this.props}
            isDisabled={noTaxes}
            updateInput={updateEditTaxProfileInput} />
        </div>
        <ul className="nav nav-tabs">
          <li key="tax-setup-tab" className={currentTab === TaxesPageTabs["tax-setup"] && 'active'}><a onClick={this.getOnTabClickHandler(TaxesPageTabs["tax-setup"])}>Tax Setup </a></li>
          <li key="fee-tax-setup-tab" className={currentTab === TaxesPageTabs["fee-tax-setup"] && 'active'}><a onClick={this.getOnTabClickHandler(TaxesPageTabs["fee-tax-setup"])}>Fee tax Setup </a></li>
          <li key="product-tax-setup-tab" className={currentTab === TaxesPageTabs["product-category-tax-setup"] && 'active'}><a onClick={this.getOnTabClickHandler(TaxesPageTabs["product-category-tax-setup"])}>Product category tax Setup</a></li>
        </ul>
        { this.renderCurrentTab() }
      </div>
    );
  }
}

TaxesPage.propTypes = {
  currentTab: PropTypes.number,
  feeTaxSetup: PropTypes.object,
  fetchFeeTaxData: PropTypes.func,
  fetchTaxData: PropTypes.func,
  noTaxes: PropTypes.bool,
  taxSetup: PropTypes.object,
  updateCurrentTab: PropTypes.func,
  updateEditTaxProfileInput: PropTypes.func,
  updateTaxSetupInput: PropTypes.func
};
