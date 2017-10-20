'use strict';
import MockData from '../data/RatesAndResiduals/MockData';
import ObjectUtil from '../../utils/ObjectUtil';

export default class IncentivesManager {
  static async getIncentives(dealerId, program){// eslint-disable-line no-unused-vars
    return MockData.incentives;
  }
  static async getSelectedIncentives(dealerId, scenarioId){// eslint-disable-line no-unused-vars
    return MockData.selectedIncentives;
  }
  static async setSelectedIncentives(incentives){
    return MockData.selectedIncentives = !incentives ? [] : incentives.map(incentive=>ObjectUtil.clone(incentive));
  }
}
