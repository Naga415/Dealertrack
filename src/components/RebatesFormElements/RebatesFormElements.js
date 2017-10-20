import React from "react";
import PropTypes from "prop-types";
import Input from "../customizedUIComponents/Input/Input";
import Row from "@coxautokc/fusion-ui-components/lib/Row";
import Col from "@coxautokc/fusion-ui-components/lib/Col";
import "./RebatesFormElements.scss";

export default class RebatesFormElements extends React.Component {
  generateOnChangeHandler = (r, type, position) => {
    if (type !== "DealerRebate") {
      return e => {
        this.props.onChange(type, e.target.value);
      };
    }

    return e => {
      this.props.onChange(type, e.target.value, position);
    };
  };
  generateOnBlurHandler = (r, type, position) => {
    if (type !== "DealerRebate") {
      return e => {
        this.props.onBlur(type, e.target.value);
      };
    }

    return e => {
      this.props.onBlur(type, e.target.value, position);
    };
  };
  generateOnDealerRebateRemoveHandler = position => {
    return () => {
      this.props.onDealerRebateRemove(position);
    };
  };
  renderRebateField(r, type, position) {
    return (
      <Row key={`rebates-row-${type}${position ? `-${position}` : ""}`}>
        {type !== "DealerRebate" ? (
          <Col md={4} xs={4}>
            <label htmlFor={r.type}>{r.name}</label>
          </Col>
        ) : (
          ""
        )}
        <Col
          xs={type !== "DealerRebate" ? 5 : 12}
          md={type !== "DealerRebate" ? 5 : 12}
        >
          <Input
            htmlId={type + (position ? ('-' + position + '-') : '-') + 'Input'}
            name={type + (position ? ('-' + position + '-') : '-') + 'Input'}
            disabled={type !== "DealerRebate"}
            addOnIndentation="left"
            addOnClassName="fa fa-usd"
            value={r.amount}
            placeholder="0.00"
            onChange={this.generateOnChangeHandler(r, type, position)}
            onBlur={this.generateOnBlurHandler(r, type, position)}
            error={this.props.showErrors && r.error}
          />
        </Col>
      </Row>
    );
  }
  render() {
    const { rebates, onDealerRebateAdd, showErrors } = this.props;
    const nonDealerRebateFields = rebates.filter(r => r.type !== "DealerRebate");
    const dealerRebateFields = rebates.find(r => r.type === "DealerRebate")
      .subElements;
    const maxDealerRebateCountReached = dealerRebateFields.length >= 4;
    const minDealerRebateCountReached = dealerRebateFields.length <= 1;

    return (
      <div id="RebatesFormElements">
        {nonDealerRebateFields.map(r => this.renderRebateField(r, r.type))}
        <Row>
          <Col md={4} xs={4}>
            <label htmlFor="dealerRebate">Dealer Rebate</label>
          </Col>
          <Col md={5} xs={5}>
            {dealerRebateFields.map((r, index) =>
              this.renderRebateField(r, "DealerRebate", index + 1)
            )}
          </Col>
          <Col md={3} xs={3}>
            {dealerRebateFields.map((r, index) => (
              <Row key={index} className="extra-padded-row">
                <Col xs={6} md={6} className="dealer-rebate-add">
                  <a 
                    id={"dealer-rebate-add" + "-" + (index + 1)}
                    className={(maxDealerRebateCountReached || ((index + 1) !== dealerRebateFields.length)) ? 'disabled': ''} 
                    disabled={maxDealerRebateCountReached || ((index + 1) !== dealerRebateFields.length)}
                    onClick={!(maxDealerRebateCountReached || ((index + 1) !== dealerRebateFields.length)) && onDealerRebateAdd}>
                    <i className="fa fa-plus"/>
                  </a>
                </Col>
                <Col xs={6} md={6} className="dealer-rebate-remove">
                  <a
                    id={"dealer-rebate-remove" + "-" + (index + 1)}
                    className={minDealerRebateCountReached ? 'disabled': ''} 
                    disabled={minDealerRebateCountReached}
                    onClick={
                      !minDealerRebateCountReached &&
                      this.generateOnDealerRebateRemoveHandler(index + 1)
                    }>
                    <i className="fa fa-minus"/>
                  </a>
                </Col>
              </Row>
            ))}           
          </Col>
        </Row>
        {showErrors && (
          <Row>
            <Col xs={12} md={12} className="error">
              * The value must be from $0 to $99,999.99
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

RebatesFormElements.propTypes = {
  showErrors: PropTypes.bool,
  rebates: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onDealerRebateAdd: PropTypes.func.isRequired,
  onDealerRebateRemove: PropTypes.func.isRequired,
};