// This is the app's initial state. Note that reducers each handle a slice of this state.
// Composing all initial state here gives us a clear spot of reference that displays the shape
// of our entire store.
import Deal from '../models/Deal';
import Customer from '../models/Customer';

export default {
  customer: new Customer(),// see Customer model for definition
  deal: new Deal(),// see Deal model for definition
  loading: true,
  ratesAndResiduals: {
    lenders: [],
    selectedLender: null,
    programs: [],
    selectedProgram: null, // see Program model for definition
    incentives: [],
    selectedIncentives: [] // see Incentive model for definition
  }
};
