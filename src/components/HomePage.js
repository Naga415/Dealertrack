"use strict";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as FeesActions from "../actions/FeesActions";

import FullPageModal from "@coxautokc/fusion-ui-components/lib/FullPageModal";
import ModalFooter from "./ModalFooter/ModalFooter";
import FeesFormHeader from "./FeesFormHeader/FeesFormHeader";
import FeesFormElements from "./FeesFormElements/FeesFormElements";
import "./HomePage.scss";
import "font-awesome/css/font-awesome.css";

export class HomePage extends Component {
  componentDidMount() {
    this.props.fetchExistingFeeQuoteFee(this.props.dealId, this.props.scenarioId);
  }

  cancel = () => {
    this.props.closeDialog();
    this.props.cancelEditing();
  };

  save = () => {
    const dataToSend = this.filterQuoteFees(this.props.quoteFees);
    const actionObject = this.props.validateQuoteFees(dataToSend);

    if (!actionObject.payload.formHasError) {
      const totalFees = dataToSend.reduce((accu, data) => {
        return accu + data["feeAmount"];
      }, 0);
      this.props.saveQuoteFees();
      this.props.pushFeeQuoteFee(dataToSend);
      this.props.populateValue(this.props.name, totalFees.toString());
      this.props.closeDialog();
    }
  };

  filterQuoteFees = quoteFees => {
    const dataToSend = quoteFees
      .filter(quoteFee => {
        return (
          quoteFee.feeType.length ||
          quoteFee.feeCustomName.length ||
          quoteFee.feeAmount.length ||
          quoteFee.paidTo.length
        );
      })
      .map(quoteFee => {
        // remove coma from numbers
        return Object.assign({}, quoteFee, {
          feeAmount: Number(quoteFee["feeAmount"].replace(/,/g, "")),
          zipCode: quoteFee["zipCode"] || this.props.zipCode
        });
      });

    return dataToSend;
  };

  showError = () => {
    const errorToShow = Object.keys(this.props.error).filter(key => {
      return this.props.error[key];
    });

    return "Please Select Fields: " + errorToShow.join(", ") + ".";
  };

  render() {
    const { closeDialog, dialogStatus } = this.props;
    return (
      <FullPageModal
        htmlId="Fees-Modal"
        className="sample-fullpage-modal"
        show={dialogStatus}
        header={<FullPageModal.Title>EDIT FEES</FullPageModal.Title>}
        onHide={closeDialog}
        footer={
          <ModalFooter
            displayResetBtn={true}
            modalName="fees"
            save={this.save}
            cancel={this.cancel}
            resetData={this.props.refreshForm}
          />
        }
      >
        <div>
          {this.props.formHasError && (
            <div className="alert alert-danger">{this.showError()}</div>
          )}
          <FeesFormHeader />
          <FeesFormElements
            grouppedFees={this.props.grouppedFees}
            handleChangeFromForm={this.props.handleChangeFromForm}
            handleChangeFromInput={this.props.handleChangeFromInput}
            handleBlurFromInput={this.props.handleBlurFromInput}
            appendFee={this.props.appendFee}
            deleteFee={this.props.deleteFee}
            quoteFees={this.props.quoteFees}
          />
          <p>
            <b>*Lender Fees</b> - The fee amount from lender programs will be
            used
          </p>
        </div>
      </FullPageModal>
    );
  }
}

HomePage.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  populateValue: PropTypes.func.isRequired,
  fetchExistingFeeQuoteFee: PropTypes.func,
  dealId: PropTypes.number.isRequired,
  scenarioId: PropTypes.number.isRequired,
  cancelEditing: PropTypes.func,
  quoteFees: PropTypes.func,
  validateQuoteFees: PropTypes.func,
  saveQuoteFees: PropTypes.func,
  pushFeeQuoteFee: PropTypes.func,
  zipCode: PropTypes.number.isRequired,
  error: PropTypes.object,
  refreshForm: PropTypes.func,
  formHasError: PropTypes.bool,
  grouppedFees: PropTypes.object,
  handleChangeFromForm: PropTypes.func,
  handleChangeFromInput: PropTypes.func,
  handleBlurFromInput: PropTypes.func,
  appendFee: PropTypes.func,
  deleteFee: PropTypes.func,
  quoteFees: PropTypes.array
};

function mapStateToProps(state) {
  return {
    formHasError: state.feesReducer.formHasError,
    error: state.feesReducer.error,
    fees: state.feesReducer.fees,
    grouppedFees: state.feesReducer.grouppedFees,
    quoteFees: state.feesReducer.quoteFees,
    savedQuoteFees: state.feesReducer.savedQuoteFees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FeesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
