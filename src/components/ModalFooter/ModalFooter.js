import React from "react";
import PropTypes from "prop-types";
import Button from "@coxautokc/fusion-ui-components/lib/Button";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import "./ModalFooter.scss";

export default function ModalFooter(props) {
  const { modalName, displayResetBtn, resetData, save, cancel } = props;

  return (
    <div id="ModalFooter">
      <Row id="buttongroup">
        <Col lg={6} md={6} sm={6} className="leftbtn">
          {displayResetBtn && (
            <div
              id={`${modalName}-ModalReset`}
              className="leftbtn"
              onClick={resetData}
            >
              <i className="fa fa-refresh fa-2x" aria-hidden="true" />
            </div>
          )}
        </Col>

        <Col lg={6} md={6} sm={6} className="rightbtns">
          <Button
            className="cancel-btn"
            htmlId={`${modalName}-modalCancel`}
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            className="save-btn"
            htmlId={`${modalName}-modalSave`}
            onClick={save}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
}

ModalFooter.propTypes = {
  cancel: PropTypes.func.isRequired,
  displayResetBtn: PropTypes.bool,
  modalName: PropTypes.string.isRequired,
  resetData: PropTypes.func,
  save: PropTypes.func.isRequired
};

ModalFooter.default = {
  displayResetBtn: false
};
