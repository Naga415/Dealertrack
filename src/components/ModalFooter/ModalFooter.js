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
        <Col sm={8} md={8} lg={8} className="leftbtn">
          <div
            id={`${modalName}-ModalReset`}
            className="leftbtn"
          >
            {displayResetBtn && (
              <i className="fa fa-refresh fa-2x" aria-hidden="true" onClick={resetData}/>
            )}
          </div>
        </Col>

        <Col sm={8} md={8} lg={8} className="rightbtns">
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
  resetData: PropTypes.func,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  modalName: PropTypes.string.isRequired,
  displayResetBtn: PropTypes.bool
};

ModalFooter.default = {
  displayResetBtn: false
};
