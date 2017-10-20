export const Trade = [{
  name: "allowance",
  label: "Trade Allowance"
}, {
  name: "payoff",
  label: "Trade Payoff"
}, {
  name: "acv",
  label: "Trade ACV"
}, {
  name: "lenderFee",
  label: "Lender Fee"
}
];

export const Common = [{
  name: "msrp",
  label: "MSRP"
}, {
  name: "downpayment",
  label: "Down Payment",
  options: [{ label: 'Percent' }, { label: 'Dollar Amount' }]
}, {
  name: "sellingprice",
  label: "Selling Price"
}, {
  name: "addons",
  label: "Add Ons",
  onClick: () => { }
}, {
  name: "fees",
  label: "Fees",
  onClick: () => { }
}, {
  name: "taxes",
  label: "Taxes"
}, {
  name: "rate",
  label: "Rate",
  options: [{ label: 'Interest' }, { label: 'Money Factor' }]

}, {
  name: "term",
  label: "Term",
  options: [{ label: 'Monthly' }, { label: 'Bi-Weekly' }, { label: 'Weekly' }, { label: 'Semi-Annually' }, { label: 'Annually' }]
}, {
  name: "rebate",
  label: "Rebate",
  onClick: () => { }
}];

export const Finance = [{
  name: "daysToFirstPayment",
  label: "Days to 1st Payment"
}];

export const Lease = [{
  name: "acquisitionFee",
  label: "Acquisition Fee"
}, {
  name: "baseResidual",
  label: "Base Residual",
  options: [{ label: 'Percent' }, { label: 'Dollar Amount' }]
}, {
  name: "adjResidual",
  label: "Adj. Residual",
  options: [{ label: 'Percent' }, { label: 'Dollar Amount' }]
}, {
  name: "milesPerYear",
  label: "Miles Per Year",
  onClick: () => { }
}, {
  name: "expectedMiles",
  label: "Expected Miles"
}, {
  name: "securityDeposit",
  label: "Security Deposit"
}, {
  name: "grossCapCost",
  label: "Gross Cap Cost"
}, {
  name: "capCostReduction",
  label: "Cap Cost Reduction"
}, {
  name: "adjustedCapCost",
  label: "Adjusted Cap Cost"
}, {
  name: "paidByCustomer",
  label: "Paid By Customer"
}];

export const Cash = [{
  name: "msrp",
  label: "MSRP"
}, {
  name: "downpayment",
  label: "Down Payment",
  options: [{ label: 'Percent' }, { label: 'Dollar Amount' }]
}, {
  name: "sellingprice",
  label: "Selling Price"
}, {
  name: "addons",
  label: "Add Ons"
}, {
  name: "fees",
  label: "Fees"
}, {
  name: "taxes",
  label: "Taxes"
}];

export const Balloon = [{
  name: "balloon",
  label: "Balloon",
  options: [{ label: 'Percent' }, { label: 'Dollar Amount' }]
}];
