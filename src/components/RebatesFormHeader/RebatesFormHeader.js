import React from "react";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import "./RebatesFormHeader.scss";

export default function RebatesFormHeader() {
  return (
    <Row id="RebatesFormHeader">
      <Col md={4} xs={4}>
        <label htmlFor="rebatesTypeLabel" id="rebates-type-left">
          Rebate Type
        </label>
      </Col>
      <Col md={4} xs={4}>
        <label htmlFor="rebatesAmountLabel" id="rebates-amount-left">
          Amount
        </label>
      </Col>
    </Row>
  );
}



