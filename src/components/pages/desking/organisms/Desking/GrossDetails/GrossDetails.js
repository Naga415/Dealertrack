'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../molecules/Table/Table';
import ProfitBreakdown from '../../../../../../models/ProfitBreakdown';
import { getFormattedNumber } from '../../../../../../utils/numberFormatter';

// eslint-disable-next-line react/prefer-stateless-function
class GrossDetails extends React.Component {
  render() {
    const { htmlId, frontGrossBreakdown, backGrossBreakdown } = this.props;
    return (
      <div id={this.props.htmlId}>
        <Table htmlId={`${htmlId}Front`} title="Front End Gross" dataFormatters={{ 'number': getFormattedNumber }} data={frontGrossBreakdown}
          columns={["Description", "Price", "Cost", "Profit"]}
          dataMap={{
            desc: "Description",
            amt: "Amount",
            cost: "Cost",
            profit: "profit"
          }} />
        <Table htmlId={`${htmlId}Back`} title="Back End Gross" dataFormatters={{ 'number': getFormattedNumber }} data={backGrossBreakdown}
          columns={["Description", "Price", "Cost", "Profit"]}
          dataMap={{
            desc: "Description",
            amt: "Amount",
            cost: "Cost",
            profit: "profit"
          }} />
      </div>
    );
  }
}

GrossDetails.propTypes = {
  htmlId: PropTypes.string,
  frontGrossBreakdown: PropTypes.arrayOf(PropTypes.instanceOf(ProfitBreakdown)),
  backGrossBreakdown: PropTypes.arrayOf(PropTypes.instanceOf(ProfitBreakdown))
};

export default GrossDetails;
