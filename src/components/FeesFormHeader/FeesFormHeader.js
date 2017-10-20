"use strict";
import React from "react";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import "./FeesFormHeader.scss";

export default function FeesFormHeader() {
  return (
    <Row id="FeesFormHeader">
      <Col md={3} sm={3} id="feesTypeLabel">
        <label htmlFor="feesTypeLabel">
          Fee Type
        </label>
      </Col>
      <Col md={3} sm={3} id="feesNameLabel">
        <label htmlFor="feesNameLabel">
          Fee Name
        </label>
      </Col>
      <Col md={2} sm={2} id="feesAmountLabel">
        <label htmlFor="feesAmountLabel">
          Amount
        </label>
      </Col>
      <Col md={1} sm={1} id="feesCapLabel">
        <label htmlFor="feesCapLabel" className="fees__capLabel">
          Cap
        </label>
        <div className="fees__tooltip">
          <i className="fa fa-info-circle" />
          <span className="tooltiptext">Capitalize</span>
        </div>
      </Col>
      <Col md={2} sm={2} id="feesPaidToLabel">
        <label htmlFor="feesPaidToLabel">
          Paid To
        </label>
      </Col>
    </Row>
  );
}
