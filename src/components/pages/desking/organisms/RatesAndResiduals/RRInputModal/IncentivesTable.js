'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import DataTable from '../../../../../reusable/DataTable/DataTable';
import ObjectUtil from '../../../../../../utils/ObjectUtil';
import Incentive from '../../../../../../models/RatesAndResiduals/Incentive';
import IconInfoOutline from '@coxautokc/fusion-ui-components/lib/Icons/IconInfoOutline';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

class IncentivesTable extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  selector = (props)=>{
    const incentive = ObjectUtil.clone(new Incentive,props.rowData);
    const checked =!!(this.props.selectedIncentives && this.props.selectedIncentives.some(i=>i.id===incentive.id));
    const enabled = !(this.props.selectedIncentives && this.props.selectedIncentives.some(i=>{
      return i.exclusions.some(e=>e===incentive.id) || incentive.exclusions.some(e=>e===i.id);
    }));

    const onClick = () =>{
      if (checked){
        this.props.removeSelectedIncentive(incentive);
      }
      else if (enabled){
        this.props.addSelectedIncentive(incentive);
      }
    };

    const onChange = ()=>{

    };

    return (
      <div>
        <Checkbox
          id={`IncentiveCheckbox${incentive.id}`}
          checked={checked}
          onChange={onChange}
          disabled={!enabled}
          onClick={onClick}/>
      </div>
    );
  }

  info = (props)=>{
    const incentive = ObjectUtil.clone(new Incentive,props.rowData);
    return (
      <Button className="pull-right" htmlId={`IncentiveButton${incentive.id}`} bsStyle="link"><IconInfoOutline/></Button>
    );
  }

  render() {
    const columns =[
      {
        name:'',
        header:' ',
        rowComponent: this.selector,
        width:20
      },
      {
        name:'name',
        header:'Name',
        width:450
      },
      {
        name:'expirationDate',
        header:'Expiration Date',
        width:200
      },
      {
        name:'offer',
        header:'$ Offer',
        width:200
      },
      {
        name:'moneyFactor',
        header:'Money Factor %',
        width:200
      },
      {
        name:'info',
        header:' ',
        rowComponent: this.info
      }
    ];
    return (
      <DataTable
        htmlId="RRIncentivesTable"
        data={this.props.incentives}
        columns={columns}
      />
    );
  }
}

IncentivesTable.propTypes = {
  addSelectedIncentive: PropTypes.func,
  removeSelectedIncentive: PropTypes.func,
  selectedIncentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive)),
  incentives: PropTypes.arrayOf(PropTypes.instanceOf(Incentive))
};

export default IncentivesTable;
