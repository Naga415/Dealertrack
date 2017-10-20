import {combineReducers} from 'redux';
import customer from './customerReducer';
import deal from './dealReducer';
import loadingStatus from './loadingStatusReducer';
import ratesAndResiduals from './ratesAndResidualsReducer';
import {taxesPageReducers} from '@coxautokc/taxes';
import {feesReducers} from '@coxautokc/fees';

const rootReducer = combineReducers({
  customer,
  deal,
  loadingStatus,
  taxesPage: taxesPageReducers,
  feesReducers,
  ratesAndResiduals
});

export default rootReducer;
