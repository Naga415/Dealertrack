import React from 'react';
import PropTypes from 'prop-types';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

// eslint-disable-next-line react/prefer-stateless-function
class DealHeader extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      showCreditScoreModal: false,
      showZipcodeModal: false
    };
    this.getLink = this.getLink.bind(this);
  }

  getLink = (value, id, handler) => {
    return (
      <Button bsStyle="link" htmlId={id} className="deal-header__button" onClick={handler}>{value}</Button>
    );
  }

  openCloseCreditScoreDialog = event => {
    event.preventDefault();
    this.setState(prevState => ({showCreditScoreModal: !prevState.showCreditScoreModal}));
  }

  openCloseZipcodeModel = event => {
    event.preventDefault();
    this.setState(prevState => ({showZipcodeModal: !prevState.showZipcodeModal}));
  }

  render() {
    const zipCodeNode = this.getLink(this.props.zipcode, 'buttonZipcode', this.openCloseZipcodeModel);
    const creditscoreNode = this.getLink(this.props.creditscore, 'buttonCreditscore', this.openCloseCreditScoreDialog);
    return (
      <div id={this.props.htmlId}>
        Deal is based on Zipcode{zipCodeNode}and a Credit Score of{creditscoreNode}
      </div>
    );
  }
}

DealHeader.defaultProps = {
  creditscore : 850
};


DealHeader.propTypes = {
  zipcode: PropTypes.string.isRequired,
  creditscore: PropTypes.number,
  htmlId: PropTypes.string.isRequired
};

export default DealHeader;
