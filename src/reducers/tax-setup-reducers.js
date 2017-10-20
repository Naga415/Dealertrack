import extend from 'lodash/extend';
import { UPDATE_TAX_SETUP_INPUT, FETCH_TAX_SETUP_DATA_SUCCESS } from '../actions/taxes-page-actions';
import { convertNullOrUndefinedToEmptyStrings } from '../utils/reducer-utils';

export const initialState = {
  retailFlat: "0",
  retailTradeCredit: null,
  retailTradeCreditAmount: "0",
  retailTaxPercent: "0",
  retailTaxMethod: null,
  retailTaxFees: false,
  retailTaxProducts: false,
  capitalize: false,
  leaseFlat: "0",
  leaseTradeCredit: null,
  leaseTradeCreditAmount: "0",
  leaseTaxPercent: "0",
  leaseTaxMethod: null,
  leaseTaxFees: false,
  leaseTaxProducts: false,
  monthlyUseTaxPercent: "0",
  monthlyTaxMethod: null,
  monthlyTaxFees: false,
  monthlyTaxProducts: false,
  capReductionTaxPercent: "0",
  capReductionTaxMethod: null,
  capTaxFees: false,
  capTaxProducts: false
};

const taxSetup = ( state = initialState, action) => {
  switch (action.type){
    case FETCH_TAX_SETUP_DATA_SUCCESS: 
      let retailTaxFields = action.payload.data.find(e => e.tax_type_name === 'retail');
      let monthlyUseTaxFields = action.payload.data.find(e => e.tax_type_name === 'mut');
      let capReductionTaxFields = action.payload.data.find(e => e.tax_type_name === 'crt');
      let leaseTaxFields = action.payload.data.find(e => e.tax_type_name === 'lease');

      retailTaxFields = convertNullOrUndefinedToEmptyStrings(retailTaxFields, [
        'flat_amt',
        'tax_rate',
        'trade_credit_amount'
      ]);

      leaseTaxFields = convertNullOrUndefinedToEmptyStrings(leaseTaxFields, [
        'flat_amt',
        'tax_rate',
        'trade_credit_amount'
      ]);

      monthlyUseTaxFields = convertNullOrUndefinedToEmptyStrings(monthlyUseTaxFields, [
        'tax_rate',
      ]);

      capReductionTaxFields = convertNullOrUndefinedToEmptyStrings(capReductionTaxFields, [
        'tax_rate'
      ]);

      return extend({}, state, {
        retailFlat: retailTaxFields['flat_amt'],
        retailTradeCredit: retailTaxFields['trade_credit_id'] && { value: retailTaxFields['trade_credit_id'], label: retailTaxFields['trade_credit_name']},
        retailTradeCreditAmount: retailTaxFields['trade_credit_amount'],
        retailTaxPercent: retailTaxFields['tax_rate'],
        retailTaxMethod: retailTaxFields['method_id'] && { value: retailTaxFields['method_id'], label: retailTaxFields['method_name']},
        retailTaxFees: (retailTaxFields['is_fee'] === 'Y'),
        retailTaxProducts: (retailTaxFields['is_product'] === 'Y'),
        leaseFlat: leaseTaxFields['flat_amt'],
        leaseTradeCredit: leaseTaxFields['trade_credit_id'] && { value: leaseTaxFields['trade_credit_id'], label: leaseTaxFields['trade_credit_name']},
        leaseTradeCreditAmount: leaseTaxFields['trade_credit_amount'],
        leaseTaxPercent: leaseTaxFields['tax_rate'],
        leaseTaxMethod: leaseTaxFields['method_id'] && { value: leaseTaxFields['method_id'], label: leaseTaxFields['method_name']},
        leaseTaxFees: (leaseTaxFields['is_fee'] === 'Y'),
        leaseTaxProducts: (leaseTaxFields['is_product'] === 'Y'),
        monthlyUseTaxPercent: monthlyUseTaxFields['tax_rate'],
        monthlyTaxMethod: monthlyUseTaxFields['method_id'] && { value: monthlyUseTaxFields['method_id'], label: monthlyUseTaxFields['method_name']},
        monthlyTaxFees: (monthlyUseTaxFields['is_fee'] === 'Y'),
        monthlyTaxProducts: (monthlyUseTaxFields['is_product'] === 'Y'),
        capReductionTaxPercent: capReductionTaxFields['tax_rate'],
        capReductionTaxMethod: capReductionTaxFields['method_id'] && { value: capReductionTaxFields['method_id'], label: capReductionTaxFields['method_name']},
        capTaxFees: (capReductionTaxFields['is_fee'] === 'Y'),
        capTaxProducts: (capReductionTaxFields['is_product'] === 'Y'),
      });
    
    case UPDATE_TAX_SETUP_INPUT: 
      return extend({}, state,
        {
          [action.payload.field]: action.payload.value
        }
      );
    default: 
      return state;
  }
};

export default taxSetup;
