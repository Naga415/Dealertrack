'use strict';
import MockData from '../data/MockData';

export default class CustomerManager {
  static async getCustomer(leadId){// eslint-disable-line no-unused-vars
    return MockData.customer;
  }
}
