'use strict';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class Table extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  applyFormatting = value => {
    const formatters = this.props.dataFormatters;
    if (formatters !== undefined) {
      const type = typeof value;
      const formatter = formatters[type];
      return formatter ? formatter(value) : value;
    }
    return value;
  }

  buildColumns = () => {
    return (
      <tr className="table-headers">
        {
          this.props.columns.map((column, i) =>
            <th key={i}>{column}</th>
          )
        }
      </tr>
    );
  }

  buildDataMap = (row) => {
    const keys = Object.keys(this.props.dataMap);
    const rowData = [];
    keys.forEach((key, i) => {
      rowData[i] = row[key];
    });
    return rowData;
  }

  buildRows = (row) => {
    const mappedRow = this.buildDataMap(row);
    return (
      mappedRow.map((value, i) =>
        <td key={i}>{this.applyFormatting(value)}</td>
      )
    );
  }

  render() {
    const { htmlId, title, data } = this.props;
    const columns = this.buildColumns();
    const rows = data.map((row, i) =>
      <tr key={i}>{this.buildRows(row)}</tr>
    );
    return (
      <div id={htmlId} className="desking-table">
        <span className="desking-table__title">
          {title}
        </span>
        <table>
          <thead>
            {columns}
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  htmlId: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  /** An array that maps the columns with the data
   * [columnName: 'DisplayName'}]
   */
  dataMap: PropTypes.object,
  title: PropTypes.string,
  /** Holds the different data formatters that needs to be applied on the [data] array
   * formatter = (value) => {}
   * {{Type: formatter}} e.g. {'number': formatter}
   */
  dataFormatters: PropTypes.object
};

export default Table;
