'use strict';
import Deal from '../../models/Deal';
import Customer from '../../models/Customer';
import CreditScore from '../../models/CreditScore';
import * as ScenarioTypes from '../../models/ScenarioTypes';
import Scenario from '../../models/Scenario';
import FinanceSummary from '../../models/FinanceSummary';
import FinanceDetails from '../../models/FinanceDetails';
import TradeDetails from '../../models/TradeDetails';
import ScenarioUpdater from '../utils/ScenarioUpdater';
import ProfitBreakdown from '../../models/ProfitBreakdown';
import * as NegotiationStatus from '../../models/NegotiationStatus';

const tradeDetails = new TradeDetails();
tradeDetails.allowance = 20000;
tradeDetails.payoff = 30000;
tradeDetails.acv = 40000;

const financeDetails = new FinanceDetails();
financeDetails.msrp = 40000;
financeDetails.sellingPrice = 45000;
financeDetails.addOns = 1000;
financeDetails.fees = 40000;
financeDetails.taxes = 4000;
financeDetails.lenderFee = 500;
financeDetails.rebate = 1000;
financeDetails.rate = 5.6;
financeDetails.term = 60;
financeDetails.firstPayment = 45;
financeDetails.downpayments = [1000];

const frontProfit1 = new ProfitBreakdown();
frontProfit1.amt = 0;
frontProfit1.cost = 0;
frontProfit1.profit = 0;
frontProfit1.desc = "Adjustments";

const frontProfit2 = new ProfitBreakdown();
frontProfit2.amt = 0;
frontProfit2.cost = 0;
frontProfit2.profit = 0;
frontProfit2.desc = "Dealer Cash";

const frontProfit3 = new ProfitBreakdown();
frontProfit3.amt = 16066;
frontProfit3.cost = 14549;
frontProfit3.profit = 1517;
frontProfit3.desc = "Vehicle Profit";

const backProfit1 = new ProfitBreakdown();
backProfit1.amt = 0;
backProfit1.cost = 0;
backProfit1.profit = 0;
backProfit1.desc = "Adjustments";

const backProfit2 = new ProfitBreakdown();
backProfit2.amt = 1795;
backProfit2.cost = 550;
backProfit2.profit = 1245;
backProfit2.desc = "The Service Contract";

const backProfit3 = new ProfitBreakdown();
backProfit3.amt = 500;
backProfit3.cost = 275;
backProfit3.profit = 225;
backProfit3.desc = "The Gap Company";

let scenario = new Scenario();
scenario.id = 0;
scenario.type = ScenarioTypes.FINANCE;
scenario.summary = new FinanceSummary();
scenario.details = financeDetails;
scenario.trade = tradeDetails;
scenario.frontProfitBreakdown = [frontProfit1, frontProfit2, frontProfit3];
scenario.backProfitBreakdown = [backProfit1, backProfit2, backProfit3];

const counterScenario = new Scenario();
counterScenario.id = 0;
counterScenario.type = ScenarioTypes.FINANCE;
counterScenario.summary = new FinanceSummary();
counterScenario.summary.payment = 250;
counterScenario.summary.amountDueAtSigning = 12345;
counterScenario.details = {
  ...financeDetails,
  msrp: 12345,
  rebate: 10000
};
counterScenario.trade = tradeDetails;
counterScenario.frontProfitBreakdown = [frontProfit1, frontProfit2, frontProfit3];
counterScenario.backProfitBreakdown = [backProfit1, backProfit2, backProfit3];

scenario = ScenarioUpdater.update(scenario);

const deal = new Deal();
deal.id = 0;
deal.leadId = 0;
deal.primaryScenario = scenario;
deal.scenarios = [scenario];
deal.negotiationStatus = NegotiationStatus.OFFER_IN_PROGRESS;

const creditScore = new CreditScore();
creditScore.equifax = 850;
creditScore.experian = 900;
creditScore.transUnion = 700;

const customer = new Customer();
customer.zipCode = 66202;
customer.creditScore = creditScore;
customer.debtToIncome = 50;
customer.paymentToIncome = 20;

class MockData {
  constructor() {
    this.customer = customer;
    this.deal = deal;
    this.counterScenario = counterScenario;
  }
}

export default new MockData();
