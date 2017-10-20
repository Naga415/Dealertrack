'use strict';
import MockData from '../data/MockData';
import * as NegotiationStatus from '../../models/NegotiationStatus';

let lastWaitingTransition = null;
let transitionTimerId = null;

export default class NegotiationManager {
  static async updateNegotiationStatus(dealId, status){// eslint-disable-line no-unused-vars
    if (status === NegotiationStatus.WAITING_FOR_RESPONSE){
      this.setupWaitingResponseTransition();
    }
    return MockData.deal.negotiationStatus = status;
  }
  static setupWaitingResponseTransition() {
    if (transitionTimerId){
      clearTimeout(transitionTimerId);
    }

    transitionTimerId = setTimeout(()=>{
      if (lastWaitingTransition === NegotiationStatus.COUNTER_OFFER_RECEIVED){
        MockData.deal.counterScenario = null;
        MockData.deal.negotiationStatus = NegotiationStatus.OFFER_ACCEPTED;
        lastWaitingTransition = NegotiationStatus.OFFER_ACCEPTED;
      }
      else {
        MockData.deal.counterScenario = MockData.counterScenario;
        MockData.deal.negotiationStatus = NegotiationStatus.COUNTER_OFFER_RECEIVED;
        lastWaitingTransition = NegotiationStatus.COUNTER_OFFER_RECEIVED;
      }
    },10000);
  }

  static async getNegotiationStatus(dealId){// eslint-disable-line no-unused-vars
    return MockData.deal.negotiationStatus;
  }

  static async getNegotiationCounterScenario(dealId){// eslint-disable-line no-unused-vars
    return MockData.deal.counterScenario;
  }
}
