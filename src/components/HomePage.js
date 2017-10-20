import React, { Component } from "react";
import PropTypes from "prop-types";
import deepClone from "lodash/cloneDeep";
import FullPageModal from "@coxautokc/fusion-ui-components/lib/FullPageModal";
import ModalFooter from "./ModalFooter/ModalFooter";
import RebatesFormHeader from "./RebatesFormHeader/RebatesFormHeader";
import RebatesFormElements from "./RebatesFormElements/RebatesFormElements";
import axios from "axios";
import "./HomePage.scss";
import "font-awesome/css/font-awesome.css";

export const RebatesPostURL =
  "http://swaggerhub.np.aws.dealertrack.com/virts/Denzil-Tarakan/dealstransformers/1.0.0/123/quote/345/rebate/";

export default class HomePage extends Component {
  static initRebates = [
    {
      id: 0,
      type: "Incentives",
      name: "Incentives",
      amount: "0"
    },
    {
      id: 0,
      type: "LoyaltyCash",
      name: "Loyalty Cash",
      amount: "0"
    },
    {
      type: "DealerRebate",
      name: "Dealer Rebate",
      subElements: [
        {
          id: 0,
          amount: "0"
        }
      ]
    }
  ];

  constructor(props) {
    super(props); 
    this.fetchedRebatesData = [];
    this.state = {
      rebates: deepClone(HomePage.initRebates),
      displayErrors: false
    };
  }

  componentDidMount() {
    axios
      .get(RebatesPostURL, {
        headers: { Authorization: "dt_test_token" }
      })
      .then(response => {
        const updatedRebates = deepClone(HomePage.initRebates);
        const incentivesRebate = response.data.find(
          d => d.rebateType === "Incentives"
        );
        if (incentivesRebate) {
          const incentiveRebateToUpdate = updatedRebates.find(
            d => (d.type = "Incentives")
          );
          incentiveRebateToUpdate.id = incentivesRebate.rebateId;
          incentiveRebateToUpdate.amount = this.formatRebateValue(
            incentivesRebate.rebateAmount.toString()
          );
        }
        const loyaltyCashRebate = response.data.find(
          d => d.rebateType === "LoyaltyCash"
        );
        if (loyaltyCashRebate) {
          const loyaltyCashRebateToUpdate = updatedRebates.find(
            d => d.type === "LoyaltyCash"
          );
          loyaltyCashRebateToUpdate.id = loyaltyCashRebate.rebateId;
          loyaltyCashRebateToUpdate.amount = this.formatRebateValue(
            loyaltyCashRebate.rebateAmount.toString()
          );
        }
        const dealerRebates = response.data.filter(
          d => d.rebateType === "DealerRebate"
        );
        if (dealerRebates.length) {
          const dealerRebateToUpdate = updatedRebates.find(
            d => d.type === "DealerRebate"
          );
          dealerRebateToUpdate.subElements = dealerRebates.map(r => ({
            id: r.rebateId,
            amount: this.formatRebateValue(r.rebateAmount.toString())
          }));

          if (dealerRebateToUpdate.subElements.length < 4){
            dealerRebateToUpdate
              .subElements.push({
                id: 0,
                amount: "0"
              });
          }
        }
        
        this.fetchedRebatesData = deepClone(updatedRebates);
        this.setState({ rebates: updatedRebates });
      });
  }

  componentWillReceiveProps(nextProps){
    const isModalAboutToOpen = nextProps.dialogStatus && !this.props.dialogStatus;
    const dealerRebates = this.state.rebates.find(r => r.type === "DealerRebate").subElements;
    if (isModalAboutToOpen &&
      dealerRebates.length < 4 &&
      parseFloat(this.unformatRebateValue(dealerRebates[dealerRebates.length - 1].amount)) !== 0){
      const updatedRebates = deepClone(this.state.rebates);
      updatedRebates
        .find(r => r.type === "DealerRebate")
        .subElements.push({
          id: 0,
          amount: "0"
        });
      this.fetchedRebatesData = deepClone(updatedRebates);
      this.setState({ rebates: updatedRebates });
    }
  }

  save = () => {
    const formHasErrors =
      this.state.rebates
        .filter(r => r.type !== "DealerRebate")
        .some(r => r.error) ||
      this.state.rebates
        .find(r => r.type === "DealerRebate")
        .subElements.some(r => r.error);

    if (formHasErrors) {
      this.setState({ displayErrors: true });
      return;
    }

    const dataToSend = [];
    let totalValue = 0;
    this.state.rebates.filter(r => r.type !== "DealerRebate").forEach(r => {
      const rawValue = this.unformatRebateValue(r.amount);
      const parsedRawValue = parseFloat(rawValue);
      totalValue += parsedRawValue;
      dataToSend.push({
        rebateId: r.id,
        rebateType: r.type,
        rebateAmount: (parsedRawValue !== 0) ? rawValue : ''
      });
    });

    this.state.rebates
      .find(r => r.type === "DealerRebate")
      .subElements.forEach(r => {
        const rawValue = this.unformatRebateValue(r.amount);
        const parsedRawValue = parseFloat(rawValue);
        totalValue += parsedRawValue;
        dataToSend.push({
          rebateId: r.id,
          rebateType: "DealerRebate",
          rebateAmount: (parsedRawValue !== 0) ? rawValue : ''
        });
      });

    axios
      .put(RebatesPostURL, dataToSend, {
        headers: { Authorization: "dt_test_token" }
      })
      .then(() => {
        this.fetchedRebatesData = this.state.rebates;
        this.props.populateValue(this.props.name, totalValue.toString());
        this.props.closeDialog();
        // eslint-disable-next-line
        alert('Rebates updated Successfully.');
      })
      .catch(() => {});
  };

  cancel = () => {
    this.props.closeDialog();
    this.setState({ rebates: this.fetchedRebatesData });
  }

  handleOnInputBlur = (type, value, position) => {
    const formattedValue = this.formatRebateValue(value);
    this.updateRebates(type, formattedValue, position);
  };

  handleOnInputChange = (type, value, position) => {
    this.updateRebates(type, value, position);
  };

  handleOnAddDealerRebate = () => {
    const updatedRebates = deepClone(this.state.rebates);
    const rebateToUpdate = updatedRebates.find(r => r.type === "DealerRebate");
    rebateToUpdate.subElements.push({
      id: 0,
      amount: "0"
    });

    this.setState({
      rebates: updatedRebates,
      displayErrors: false
    });
  };

  handleOnRemoveDealerRebate = position => {
    const updatedRebates = deepClone(this.state.rebates);
    const rebateToUpdate = updatedRebates.find(r => r.type === "DealerRebate");
    rebateToUpdate.subElements.splice(position - 1, 1);

    this.setState({
      rebates: updatedRebates,
      displayErrors: false
    });
  };

  updateRebates(type, value, position) {
    const updatedRebates = deepClone(this.state.rebates);
    const rebateToUpdate = updatedRebates.find(r => r.type === type);
    if (type !== "DealerRebate") {
      rebateToUpdate.amount = value;
      rebateToUpdate.error = this.validateRebateValue(value);
    } else {
      const delaerRebateFieldToUpdate =
      rebateToUpdate.subElements[position - 1];
      delaerRebateFieldToUpdate.amount = value;
      delaerRebateFieldToUpdate.error = this.validateRebateValue(value);
    }
    
    this.setState({
      rebates: updatedRebates,
      displayErrors: false
    });
  }

  formatRebateValue(value) {
    // change value to the format "1,000,000.00"
    let formattedValue = parseFloat(value.replace(/,/g, ""))
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    formattedValue === "NaN" && (formattedValue = "");
    return formattedValue;
  }

  unformatRebateValue(value) {
    // Remove comma from number
    return value.replace(/,/g, "");
  }

  validateRebateValue(value) {
    const rawValue = parseFloat(this.unformatRebateValue(value));
    return rawValue < 0 || rawValue > 99999.99;
  }

  render() {
    const { closeDialog, dialogStatus } = this.props;

    return (
      <div>
        <FullPageModal
          htmlId="Rebates-Modal"
          className="sample-fullpage-modal"
          show={dialogStatus}
          header={<FullPageModal.Title>EDIT REBATES</FullPageModal.Title>}
          onHide={closeDialog}
          footer={
            <ModalFooter
              displayResetBtn={false}
              modalName="rebates"
              save={this.save}
              cancel={this.cancel}
            />
          }
        >
          <div>
            <RebatesFormHeader />
            <RebatesFormElements
              rebates={this.state.rebates}
              onChange={this.handleOnInputChange}
              onBlur={this.handleOnInputBlur}
              onDealerRebateAdd={this.handleOnAddDealerRebate}
              onDealerRebateRemove={this.handleOnRemoveDealerRebate}
              showErrors={this.state.displayErrors}
            />
          </div>
        </FullPageModal>
      </div>
    );
  }
}

HomePage.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  populateValue: PropTypes.func.isRequired
};
