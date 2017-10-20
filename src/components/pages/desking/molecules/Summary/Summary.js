'use strict';
import React from 'react';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import PropTypes from 'prop-types';
import Item from './Item';

// eslint-disable-next-line react/prefer-stateless-function
class Summary extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id={this.props.htmlId} className="deal-summary">
        <div className="deal-summary__header">
          <label htmlFor="FinanceSummaryHeader">
            {this.props.title}
          </label>
        </div>
        <Grid className="deal-summary__body">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

Summary.propTypes = {
  htmlId: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};

Summary.Item = Item;
export default Summary;
