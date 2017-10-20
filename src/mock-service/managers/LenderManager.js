'use strict';
import MockData from '../data/RatesAndResiduals/MockData';

export default class LenderManager {
  static async getLenders(dealId){// eslint-disable-line no-unused-vars
    return MockData.lenders;
  }
}
