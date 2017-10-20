'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Incentive from '../../../../../models/RatesAndResiduals/Incentive';
import Program from '../../../../../models/RatesAndResiduals/Program';
import Button from '@coxautokc/fusion-ui-components/lib/Button';
import DataTable from '@coxautokc/fusion-ui-components/lib/DataTable';
import { getCurrencyFormattedNumber } from '../../../../../utils/numberFormatter';

// eslint-disable-next-line react/prefer-stateless-function
class ProgramDetails extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  showRRModal = () => {
    this.props.onShowRRModal(true);
  }

  getTotalIncentivesApplied = () => {
    let total = 0;
    if (this.props.selectedIncentives) {
      this.props.selectedIncentives.forEach(function (incentive) {
        total += incentive.offer;
      }, this);
    }
    return getCurrencyFormattedNumber(total);
  }

  buildColumnHeaders = () => {
    return [
      {
        columnName: "type",
        displayName: "Type",
      },
      {
        columnName: 'lender',
        displayName: 'Lender'
      },
      {
        columnName: 'rebates',
        displayName: 'Rebates'
      },
      {
        columnName: 'rateMoneyFactor',
        displayName: 'Rate/MF'
      },
      {
        columnName: 'term',
        displayName: 'Term'
      },
      {
        columnName: 'acquisitionFee',
        displayName: 'Acquisition Fee'
      },
      {
        columnName: 'residual',
        displayName: 'Res %'
      },
      {
        columnName: 'maxAdvance',
        displayName: 'Max Adv'
      }
    ];
  }

  render() {
    return (
      <div id={this.props.htmlId} className="program-details">
        <DataTable
          htmlId="AppliedIncentivesTable"
          className="program-details__table"
          columnHeaders={this.buildColumnHeaders()}
          data={[this.props.selectedProgram]}
          columns={["type", "lender", "rebates", "rateMoneyFactor", "term", "acquisitionFee", "residual", "maxAdvance"]}
          displayFilter={false}
          displayPagination={false}
        />
        <div className="program-details__incentives">Applied Incentives&nbsp;&nbsp;&nbsp;{this.getTotalIncentivesApplied()}</div>
        <Button
          htmlId="ViewDetailsLink"
          className='program-details__modal_link'
          bsStyle="link"
          onClick={this.showRRModal}>View Details</Button>
      </div>
    );
  }
}

ProgramDetails.propTypes = {
  htmlId: PropTypes.string.isRequired,
  selectedProgram: PropTypes.instanceOf(Program),
  selectedIncentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive)),
  selectedLender: PropTypes.string,
  onShowRRModal: PropTypes.func
};

export default ProgramDetails;
