'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Card from '@coxautokc/fusion-ui-components/lib/Card';
import Program from '../../../../../models/RatesAndResiduals/Program';
import AddProgramDetails from './AddProgramDetails';
import ProgramDetails from './ProgramDetails';
import PropTypes from 'prop-types';
import Incentive from '../../../../../models/RatesAndResiduals/Incentive';
import { bindActionCreators } from 'redux';
import * as RRActions from '../../../../../actions/ratesAndResidualsActions';
import RRInputModal from './RRInputModal/RRInputModal';

// eslint-disable-next-line react/prefer-stateless-function
class RatesAndResiduals extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showRRModal: false };
  }

  onShowRRModal = () => {
    this.setState({ showRRModal: true });
  }


  onRRModalHide = () => {
    this.setState({ showRRModal: false });
  }

  render() {
    const { selectedProgram, selectedIncentives, selectedLender } = this.props;
    return (
      <Card
        htmlId="RatesAndResidualsCard"
        header="RATES & RESIDUALS">
        {this.props.selectedProgram ?
          <ProgramDetails onShowRRModal={this.onShowRRModal} htmlId="ProgramDetails" selectedProgram={selectedProgram} selectedIncentives={selectedIncentives}
            selectedLender={selectedLender} /> :
          <AddProgramDetails onShowRRModal={this.onShowRRModal} />}
        <RRInputModal show={this.state.showRRModal} actions={this.props.actions} onHide={this.onRRModalHide} />
      </Card>
    );
  }
}
RatesAndResiduals.propTypes = {
  selectedProgram: PropTypes.instanceOf(Program),
  selectedIncentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive)),
  selectedLender: PropTypes.string,
  actions: PropTypes.shape({
    rr: PropTypes.object
  })
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.ratesAndResiduals.selectedProgram,
    selectedIncentives: state.ratesAndResiduals.selectedIncentives,
    selectedLender: state.ratesAndResiduals.selectedLender,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      rr: bindActionCreators(RRActions, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatesAndResiduals);

