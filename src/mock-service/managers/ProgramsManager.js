'use strict';
import MockData from '../data/RatesAndResiduals/MockData';
import ObjectUtil from '../../utils/ObjectUtil';

export default class ProgramsManager {
  static async getPrograms(dealerId, lender){// eslint-disable-line no-unused-vars
    return MockData.programs.map(program=>ObjectUtil.clone(program,{lender}));
  }
  static async getSelectedProgram(dealerId, scenarioId){// eslint-disable-line no-unused-vars
    return MockData.selectedProgram;
  }
  static async setSelectedProgram(selectedProgram){// eslint-disable-line no-unused-vars
    return MockData.selectedProgram = ObjectUtil.clone(selectedProgram);
  }
}
