import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "react-bootstrap/lib/Grid";
import Col from "react-bootstrap/lib/Col";
import FullPageModal from "@coxautokc/fusion-ui-components/lib/FullPageModal";
import ModalFooter from "./customizedUiComponents/ModalFooter/ModalFooter";

import "font-awesome/css/font-awesome.css";
import "react-select/dist/react-select.css";
import "../index.scss";
import "@coxautokc/fusion-theme/dist/fusion-theme.min.css"; // eslint-disable-line
import TaxesPage from "./taxes-page";

export default class HomePage extends Component {
  save = () => {
    const totalTaxAmount = "0";
    this.props.populateValue(this.props.name, totalTaxAmount);
    this.props.closeDialog();
  }
 
  render() {
    const { isDisabled, dialogStatus, closeDialog } = this.props;

    return (
      <div>
        <FullPageModal
          htmlId="Taxes-Modal"
          className="sample-fullpage-modal"
          show={dialogStatus}
          header={<FullPageModal.Title>EDIT TAXES</FullPageModal.Title>}
          onHide={closeDialog}
          footer={
            <ModalFooter
              modalName="taxes"
              isDisabled={isDisabled}
              save={this.save}
              cancel={closeDialog}
              resetData={this.resetData}
            />
          }
        >
          <Grid
            fluid
            className="template-page-wrapper page-wrapper__content-only"
          >
            <Col sm={12} md={12} lg={12}>
              <TaxesPage
                updateCurrentTab={this.props.updateCurrentTab}
                updateEditTaxProfileInput={this.props.updateEditTaxProfileInput}
                updateTaxSetupInput={this.props.updateTaxSetupInput}
                fetchTaxData={this.props.fetchTaxData}
                fetchFeeTaxData={this.props.fetchFeeTaxData}
                currentTab={this.props.currentTab}
                feeTaxSetup={this.props.feeTaxSetup}
                noTaxes={this.props.noTaxes}
                profile={this.props.profile}
                state={this.props.state}
                taxSetup={this.props.taxSetup}
                zipcode={this.props.zipcode}
              />
            </Col>
          </Grid>
        </FullPageModal>
      </div>
    );
  }
}

HomePage.propTypes = {
  currentTab: PropTypes.number,
  feeTaxSetup: PropTypes.object,
  fetchFeeTaxData: PropTypes.func,
  fetchTaxData: PropTypes.func,
  isDisabled: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  populateValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  noTaxes: PropTypes.bool,
  profile: PropTypes.object,
  state: PropTypes.string,
  taxSetup: PropTypes.object,
  updateCurrentTab: PropTypes.func,
  updateEditTaxProfileInput: PropTypes.func,
  updateTaxSetupInput: PropTypes.func,
  zipcode: PropTypes.string
};


