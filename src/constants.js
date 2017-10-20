import { generateNumArray } from './utils/mock-utils';

/* Mock URLs */

export const taxSetupDataUrl = 'http://localhost:3002/db';

/* Enums */

export const TaxesPageTabs = {
  "tax-setup": 1,
  "fee-tax-setup": 2,
  "product-category-tax-setup": 3
};

/* Dummy Options */

const additionalMethodOptions = [
  {
    value: 10,
    label: 'Monthly Payment'
  },
  {
    value: 11,
    label: 'Sale Price/Doc Fee/ESC'
  },
  {
    value: 12,
    label: 'Bitcoin Payment'
  },
  {
    value: 13,
    label: 'Paypal'
  }
];

export const profileOptions = generateNumArray(2).map(n => ({
  value: n,
  label: `Profile ${n}`
}));

export const retailTaxOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Retail Tax ${n}`
}));
export const retailTaxMethodOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Retail Method ${n}`
})).concat(additionalMethodOptions);

export const retailTradeCreditOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Retail Trade Credit ${n}`
}));

export const leaseTaxOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Lease Tax ${n}`
}));

export const leaseTaxMethodOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Lease Method ${n}`
})).concat(additionalMethodOptions);

export const leaseTradeCreditOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Lease Trade Credit ${n}`
}));

export const monthlyUseTaxOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Montly Use Tax ${n}`
}));

export const monthlyTaxMethodOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Monthly TaxMethod ${n}`
})).concat(additionalMethodOptions);

export const capReductionTaxOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Cap Reduction ${n}`
}));

export const capReductionTaxMethodOptions = generateNumArray(3).map(n => ({
  value: n,
  label: `Cap Reduction Method ${n}`
})).concat(additionalMethodOptions);

export const feeTaxSetupTableData = generateNumArray(3).map(n => ({
  feeType: `Fee Type ${n}`,
}));
