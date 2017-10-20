"use strict";
import React from "react";
import PropTypes from "prop-types";
import TextInput from "@coxautokc/fusion-ui-components/lib/TextInput";
import Checkbox from "react-bootstrap/lib/Checkbox";
import SelectInput from "@coxautokc/fusion-ui-components/lib/SelectInput";
import SelectWithGroup from "../customizedUIComponents/SelectWithGroup";
import Input from "../customizedUIComponents/Input/Input";
import IconAdd from "@coxautokc/fusion-ui-components/lib/Icons/IconAdd";
import IconDelete from "@coxautokc/fusion-ui-components/lib/Icons/IconDelete";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import "./FeesFormElements.scss";

export default function FeesFormElements(props) {
  const paidTo = [
    {
      label: null,
      value: null
    },
    {
      label: "Dealer",
      value: "Dealer"
    },
    {
      label: "State",
      value: "State"
    },
    {
      label: "Others",
      value: "Others"
    }
  ];

  const {
    grouppedFees,
    handleChangeFromForm,
    handleChangeFromInput,
    handleBlurFromInput,
    appendFee,
    deleteFee,
    quoteFees
  } = props;

  return (
    <div id="FeesFormElements">
      {quoteFees.map((qf, index) => {
        return (
          <Row key={`row-${index}`}>
            <Col md={3} sm={3}>
              <SelectWithGroup
                displayLabel={false}
                htmlId={`feesFeeType-${index}`}
                name={`feesFeeType-${index}`}
                label="Fees"
                placeholder=" "
                options={grouppedFees}
                displayPlaceholder={true}
                // eslint-disable-next-line
                onChange={e => handleChangeFromForm("feeType", e)}
                value={qf.feeId.toString()||"0"}
              />
            </Col>

            <Col md={3} sm={3}>
              <TextInput
                displayLabel={false}
                htmlId={`feesFeeName-${index}`}
                name={`feesFeeName-${index}`}
                label="Fee Name"
                placeholder=" "
                maxLength={50}
                // eslint-disable-next-line
                onChange={e => handleChangeFromForm("feeCustomName", e)}
                value={qf.feeCustomName||""}
              />
            </Col>

            <Col md={2} sm={2}>
              <Input
                displayLabel={false}
                htmlId={`feesAmount-${index}`}
                addOnClassName="fa fa-usd"
                name={`feesAmount-${index}`}
                label="Amount"
                disabled={false}
                value={qf.feeAmount}
                //eslint-disable-next-line
                onChange={handleChangeFromInput}
                onBlur={handleBlurFromInput}
              />
            </Col>

            <Col md={1} sm={1}>
              <Checkbox
                id={`feesCap-${index}`}
                name={`feesCap-${index}`}
                label="Cap"
                //eslint-disable-next-line
                onChange={e => handleChangeFromForm("capitalizedIndicator", e)}
                checked={qf.capitalizedIndicator}
              />
            </Col>

            <Col md={2} sm={2}>
              <SelectInput
                htmlId={`feesPaidTo-${index}`}
                name={`feesPaidTo-${index}`}
                label="PaidTo"
                //eslint-disable-next-line
                onChange={e => handleChangeFromForm("paidTo", e)}
                options={paidTo}
                displayLabel={false}
                displayPlaceholder={false}
                value={qf.paidTo}
              />
            </Col>

            <Col md={1} sm={1} id={`feesInteraction-${index}`}>
              {quoteFees.length !== index + 1 ? (
                <IconAdd className="deactive-add-btn" />
              ) : (
                <IconAdd className="active-add-btn" onClick={appendFee} />
              )}

              {quoteFees.length > 1 && (
                <IconDelete
                  className="active-delete-btn"
                  // eslint-disable-next-line
                  onClick={() => deleteFee(index)}
                />
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

FeesFormElements.propTypes = {
  deleteFee: PropTypes.func.isRequired,
  quoteFees: PropTypes.array.isRequired,
  handleChangeFromForm: PropTypes.func.isRequired,
  handleBlurFromInput: PropTypes.func.isRequired,
  handleChangeFromInput: PropTypes.func.isRequired,
  appendFee: PropTypes.func.isRequired,
  grouppedFees: PropTypes.object.isRequired
};
