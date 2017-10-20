import React from 'react';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ProfitBreakdown from '../../../../../../models/ProfitBreakdown';
import GrossDetails from '../GrossDetails/GrossDetails';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DealActions from '../../../../../../actions/dealActions';

class GrossDetailsModalClass extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { scenarioId, dealId, showActionDialog } = this.props;
    const modalIsOpening = !showActionDialog && nextProps.showActionDialog;
    if (modalIsOpening) {
      this.props.actions.deal.getScenarioProfitBreakdownAsync(scenarioId, dealId);
    }
  }

  render() {
    const { showActionDialog, closeDialog, htmlId, frontGrossBreakdown, backGrossBreakdown } = this.props;
    return (
      <Modal id={htmlId} show={showActionDialog} onHide={closeDialog} >
        <Modal.Header closeButton>
          <Modal.Title>Gross Profit Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GrossDetails htmlId="GrossDetails" frontGrossBreakdown={frontGrossBreakdown} backGrossBreakdown={backGrossBreakdown} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeDialog} htmlId={`${this.props.htmlId}-close`}>Close</Button>
          <Button onClick={this.props.closeDialog} htmlId={`${this.props.htmlId}-apply`} bsStyle="primary">Apply</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

GrossDetailsModalClass.propTypes = {
  htmlId: PropTypes.string,
  closeDialog: PropTypes.func,
  showActionDialog: PropTypes.bool,
  scenarioId: PropTypes.number.isRequired,
  dealId: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  frontGrossBreakdown: PropTypes.arrayOf(PropTypes.instanceOf(ProfitBreakdown)),
  backGrossBreakdown: PropTypes.arrayOf(PropTypes.instanceOf(ProfitBreakdown))
};

function mapStateToProps(state) {
  return {
    scenarioId: state.deal.primaryScenario.id,
    dealId: state.deal.id,
    showGrossProfit: state.deal.showGrossProfit,
    frontGrossBreakdown: state.deal.primaryScenario.frontProfitBreakdown,
    backGrossBreakdown: state.deal.primaryScenario.backProfitBreakdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deal: bindActionCreators(DealActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GrossDetailsModalClass);
