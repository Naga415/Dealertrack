'use strict';
import React from 'react';
import {connect} from 'react-redux';
import FullPageModal from '@coxautokc/fusion-ui-components/lib/FullPageModal';
import Scenario from '../../../../../../models/Scenario';
import Customer from '../../../../../../models/Customer';
import PropTypes from 'prop-types';
import ProgramsTable from './ProgramsTable';
import DealInputs from './DealInputs';
import Lenders from './Lenders';
import Program from '../../../../../../models/RatesAndResiduals/Program';
import Incentive from '../../../../../../models/RatesAndResiduals/Incentive';
import IncentivesTable from './IncentivesTable';
import Card from '@coxautokc/fusion-ui-components/lib/Card';
import Footer from './Footer';

export class RRInputModalClass extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state= {
      creditScore: '',
      zipCode: '',
      sellingPrice: '',
      downpayment:'',
      tradeAllowance: '',
      tradePayoff: '',
      tradeACV: '',
      selectedProgram:null,
      selectedLender:'',
      selectedIncentives:[]
    };
  }
  componentDidMount(){
    this.props.actions.rr.initialize(90);
  }
  componentWillReceiveProps(props){
    const modalIsOpening =!this.props.show && props.show;
    if (modalIsOpening){
      this.setState({
        creditScore: props.customer && props.customer.creditScore,
        zipCode: props.customer && props.customer.zip,
        sellingPrice: props.scenario && props.scenario.details.sellingPrice,
        downpayment: props.scenario && props.scenario.details.downpayments[0],
        tradeAllowance: props.scenario && props.scenario.trade.allowance,
        tradePayoff: props.scenario && props.scenario.trade.payoff,
        tradeACV: props.scenario && props.scenario.trade.acv,
        selectedProgram: props.selectedProgram,
        selectedLender: props.selectedLender,
        selectedIncentives: props.selectedIncentives
      });
    }
  }

  updateDealInputs = (e) =>{
    const {name,value} = e.target;
    this.setState({[name]: value});
  }

  setSelectedProgram = (selectedProgram) =>{
    this.setState({selectedProgram});
    this.props.actions.rr.retrieveIncentives(90, selectedProgram);
  }

  setSelectedLender = (selectedLender) =>{
    this.setState({selectedLender,selectedProgram:null});
    this.props.actions.rr.retrievePrograms(90, selectedLender);
  }

  addSelectedIncentive = (incentive) =>{
    if (this.state.selectedIncentives.some(i=>i.id===incentive.id)){
      return;
    }
    const selectedIncentives = this.state.selectedIncentives?[...this.state.selectedIncentives,incentive]:[incentive];
    this.setState({selectedIncentives});
  }

  removeSelectedIncentive = (incentive) =>{
    if (!this.state.selectedIncentives){
      return;
    }

    const selectedIncentives = this.state.selectedIncentives.filter(i => i.id!==incentive.id);
    this.setState({selectedIncentives});
  }

  onApply =() =>{
    const {selectedProgram, selectedIncentives} = this.state;
    this.props.actions.rr.updateScenarioAsync(90, this.props.scenario.id, selectedProgram, selectedIncentives);
    this.props.onHide();
  }

  onCancel =() =>{
    this.props.onHide();
  }

  render() {
    const breadCrumbs = [{text:"Deal Summary",onClick:this.props.onHide}, {text:"Rates & Residuals"}];
    return (
      <FullPageModal
        htmlId="RRInputModal"
        show={this.props.show}
        onHide={this.props.onHide}
        closeButton={true}
        breadcrumb={breadCrumbs}
        footer={(<Footer onApply={this.onApply} onCancel={this.onCancel} applyEnabled={!!this.state.selectedProgram}/>)}>
        <Card header="LENDER PROGRAMS" htmlId="LenderProgramsCard">
          <DealInputs {...this.state} updateDealInputs={this.updateDealInputs}/>
          <Lenders lenders={this.props.lenders} selectedLender={this.state.selectedLender} setSelectedLender={this.setSelectedLender}/>
          <ProgramsTable programs={this.props.programs} selectedProgram={this.state.selectedProgram} setSelectedProgram={this.setSelectedProgram}/>
        </Card>
        <Card header="INCENTIVES" htmlId="IncentivesCard">
          <IncentivesTable
            incentives={this.props.incentives}
            selectedIncentives={this.state.selectedIncentives}
            addSelectedIncentive={this.addSelectedIncentive}
            removeSelectedIncentive={this.removeSelectedIncentive}/>
        </Card>
      </FullPageModal>
    );
  }
}

function mapStateToProps(state) {
  return {
    scenario: state.deal.primaryScenario,
    programs: state.ratesAndResiduals.programs,
    selectedProgram: state.ratesAndResiduals.selectedProgram,
    lenders: state.ratesAndResiduals.lenders,
    selectedLender:state.ratesAndResiduals.selectedLender,
    incentives:state.ratesAndResiduals.incentives,
    selectedIncentives:state.ratesAndResiduals.selectedIncentives,
  };
}

RRInputModalClass.propTypes = {
  scenario: PropTypes.instanceOf(Scenario),
  customer: PropTypes.instanceOf(Customer),
  lenders:  PropTypes.arrayOf(PropTypes.string),
  selectedLender: PropTypes.string,
  selectedProgram: PropTypes.instanceOf(Program),
  programs: PropTypes.arrayOf(PropTypes.instanceOf(Program)),
  incentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive)),
  selectedIncentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive)),
  onHide: PropTypes.func,
  show: PropTypes.bool,
  actions: PropTypes.shape({
    rr: PropTypes.object
  })
};

export default connect(
  mapStateToProps
)(RRInputModalClass);
