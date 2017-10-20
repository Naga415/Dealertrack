'use strict';
import CreditScore from './CreditScore';

export default class Customer {
  constructor() {
    this.zipCode = 0;
    this.creditScore = new CreditScore();
    this.debtToIncome = 0;
    this.paymentToIncome = 0;
  }
}
