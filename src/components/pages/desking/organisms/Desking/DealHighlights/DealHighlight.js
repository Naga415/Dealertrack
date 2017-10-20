'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import { getCurrencyFormattedNumber } from '../../../../../../utils/numberFormatter';

// eslint-disable-next-line react/prefer-stateless-function
class DealHighlight extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return (this.props.amount !== nextProps.amount) || (this.props.isHidden !== nextProps.isHidden);
  }
  render() {
    const { htmlId, isHidden, amount, counterAmount, paymentType, onClick } = this.props;
    const dealHighlightClass = isHidden ? "deal-highlight deal-highlight--hide" : "deal-highlight";
    const dealHighlightStateClass = (counterAmount && amount !== counterAmount) ? "deal-highlight-state--different" : "";
    const formattedAmount = getCurrencyFormattedNumber((counterAmount ? counterAmount : amount) || 0);
    return (
      <div id={htmlId} className={`${dealHighlightClass} ${dealHighlightStateClass}`}>
        <Button
          htmlId={`${htmlId}-label`}
          bsStyle="link"
          className="deal-highlight__button" onClick={onClick} >
          {paymentType}
        </Button>
        <div id={htmlId + "-amount"} className="amount display-3">{formattedAmount}</div>
      </div>
    );
  }
}
DealHighlight.propTypes = {
  htmlId: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  paymentType: PropTypes.string,
  amount: PropTypes.number,
  counterAmount: PropTypes.number,
  onClick: PropTypes.func
};

export default DealHighlight;
