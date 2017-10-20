'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Radio from 'react-bootstrap/lib/Radio';
import DataTable from '../../../../../reusable/DataTable/DataTable';
import ObjectUtil from '../../../../../../utils/ObjectUtil';
import Program from '../../../../../../models/RatesAndResiduals/Program';

// eslint-disable-next-line react/prefer-stateless-function
class ProgramsTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  selector = (props)=>{
    const onClick = () =>{
      const selectedProgram = ObjectUtil.clone(new Program,props.rowData);
      this.props.setSelectedProgram(selectedProgram);
    };

    const onChange = ()=>{

    };
    
    const checked = !!(this.props.selectedProgram && (this.props.selectedProgram.id === props.rowData.id));
    return (
      <div>
        <Radio
          id={`ProgramRadio${props.rowData.id}`}
          checked={checked}
          onClick={onClick}
          onChange={onChange}/>
      </div>
    );
  }

  render() {
    const columns =[
      {
        name:'',
        header:' ',
        rowComponent: this.selector,
        width:10
      },
      {
        name:'type',
        header:'Type',
        width:200
      },
      {
        name:'lender',
        header:'Lender',
        width:200
      },
      {
        name:'rebates',
        header:'Rebates',
        width:200
      },
      {
        name:'rateMoneyFactor',
        header:'Rate/MF',
        width:200
      },
      {
        name:'term',
        header:'Term',
        width:200
      },
      {
        name:'acquisitionFee',
        header:'Acq Fee',
        width:200
      },
      {
        name:'residual',
        header:'Res %',
        width:200
      },
      {
        name:'milesPerYear',
        header:'Miles/yr',
        width:200
      },
      {
        name:'payment',
        header:'Payment',
        width:200
      },
      {
        name:'frontGross',
        header:'F. Gross',
        width:200
      },
      {
        name:'backGross',
        header:'B. Gross',
        width:200
      },
      {
        name:'expirationDate',
        header:'Exp Date',
        width:200
      },
      {
        name:'maxAdvance',
        header:'Max Adv',
        width:200
      },
      {
        name:'amountFinanced',
        header:'Amnt Financed'
      }
    ];
    return (
      <DataTable
        htmlId="RRProgramsTable"
        data={this.props.programs}
        columns={columns}
      />
    );
  }
}

ProgramsTable.propTypes = {
  setSelectedProgram: PropTypes.func,
  selectedProgram: PropTypes.instanceOf(Program),
  programs: PropTypes.arrayOf(PropTypes.instanceOf(Program))
};

export default ProgramsTable;
