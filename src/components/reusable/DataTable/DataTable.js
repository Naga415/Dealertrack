// ***modification/fork of:
// https://ghe.coxautoinc.com/VinSolutions/fusion-ui-components/tree/develop/src/components/DataTable

import React from 'react';
import PropTypes from 'prop-types';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import DataTableSettings from './DataTableSettings';
import DataTablePagination from './DataTablePagination';
import { connect } from 'react-redux';

const styleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: '▼',
      sortAscendingIcon: '▲'
    },
  },
  classNames: {
    Filter: 'griddle-filter form-control',
    NextButton: 'griddle-next-button btn btn-default',
    PreviousButton: 'griddle-previous-button btn btn-default',
    SettingsToggle: 'griddle-settings-toggle btn btn-default'
  }
};

const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(r => r.get('griddleKey') === griddleKey)
    .toJSON();
};

// Fix for RowData bug
// https://github.com/GriddleGriddle/Griddle/issues/586
const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});


/** Paginated, sortable, filterable tabular grid */
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: this.props.pageSize || this.props.rowsPerPage[0]
    };
  }

  getColumnTitle(data, object) {
    for (const key in object) {
      if (object[key].columnName === data) {
        return object[key].displayName;
      }
    }
    return;
  }

  onChange = (e) => {
    this.setState({ pageSize: e });
  };

  render() {
    const { data, columns, columnWidths, rowsPerPage, columnHeaders, displaySettings, htmlId, className } = this.props;// eslint-disable-line no-unused-vars
    const { pageSize } = this.state;

    const components = {
      Settings: () => <DataTableSettings onChange={this.onChange} value={pageSize} rowsPerPage={rowsPerPage} />,
      PageDropdown: (props) => <DataTablePagination {...props} />,
      NextButton: () => null,
      PreviousButton: () => null
    };

    if (!displaySettings) {
      components.SettingsToggle = () => null;
    }

    return (
      <div
        className={"data-table " + className}
        id={htmlId}
      >
        <Griddle
          data={data}
          plugins={[plugins.LocalPlugin]}
          styleConfig={styleConfig}
          pageProperties={{
            pageSize
          }}
          components={components}
        >
          <RowDefinition>
            {columns.filter(c=>!c.disabled)
              .map((column,index) => {
                return (<ColumnDefinition
                  order={index + 1}
                  key={column.name} id={column.name}
                  width={(column.width!==undefined && column.width!==null) ? column.width : null}
                  title={(column.header!==undefined && column.header!==null) ? column.header : column.name}
                  customComponent={column.rowComponent?enhancedWithRowData(column.rowComponent):null}
                />);
              })
            }
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}

DataTable.propTypes = {
  /** Adds additional class name(s). */
  className: PropTypes.string,

  /** Column title override that takes an array of objects. It matches the key columnName value to the columns prop and will replace it with key displayName value. Example [{ columnName: "Price", displayName: "Price USD" }] */
  columnHeaders: PropTypes.array,

  /** Set column widths via array for each column. Example [100, 150, 200, 250] */
  columnWidths: PropTypes.array,

  /** An array of columns to be displayed. Each string in the array corresponds to a property in the data object. Example: If the data object has properties for year, make, model, to display a table with just year and make: ["year", "make"] */
  columns: PropTypes.array.isRequired,

  /** An array of objects to be displayed. Each item in this array will be rendered as a row in the table. The specific properties displayed is configured via the columns prop. */
  data: PropTypes.array.isRequired,

  /** Display settings option when set to true. */
  displaySettings: PropTypes.bool,

  /** Globally unique and descriptive HTML ID. Used by QA for automated testing. */
  htmlId: PropTypes.string.isRequired,

  /** Override default rows to be displayed.  Default is the first value of rowsPerPage array. */
  pageSize: PropTypes.number,

  /** An array options to pick from in rows per page dropdown under settings. */
  rowsPerPage: PropTypes.array
};

DataTable.defaultProps = {
  rowsPerPage: [5, 10, 25, 50, 100],
  displaySettings: false
};

export default DataTable;
