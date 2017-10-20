'use strict';
import { SET_CUSTOMER } from '../actions/actionTypes';
import ObjectUtil from '../utils/ObjectUtil';
import initialState from './initialState';
import customerReducer from './customerReducer';
import Customer from '../models/Customer';
import { setCustomer } from '../actions/customerActions';
import deepFreeze from 'deep-freeze';

describe('Customer reducer', () => {

  it('should return the initial state', () => {
    expect(customerReducer(undefined, {})).toEqual(
      initialState.customer
    )
  });

  it('should handle SET_CUSTOMER', () => {
    // perform a deepFreeze on the initial state object to make sure it doesn't mutate
    deepFreeze(initialState);
    const expectedCustomer = ObjectUtil.clone(new Customer(), { zipCode: '66224' });
    expect(
      customerReducer(initialState.customer, setCustomer(expectedCustomer))
    ).toEqual(expectedCustomer);

  });
});
