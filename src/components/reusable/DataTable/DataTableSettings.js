// *** copy of https://ghe.coxautoinc.com/VinSolutions/fusion-ui-components/blob/develop/src/components/DataTable/DataTableSettings.js
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

class DataTableSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  onChange = (e) => {
    const value = parseInt(e.target.value, 10);
    this.props.onChange(value);
    this.setState({ value });
  };

  render() {
    const { rowsPerPage } = this.props;
    const { value } = this.state;

    return (
      <Well className="griddle-settings">
        <Row>
          <Col xs={12}>
            <h5>Settings</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <FormGroup
              className={"className"}
              controlId={"htmlId"}
            >
              <ControlLabel>Rows per page:</ControlLabel>
              <FormControl
                id={"htmlId"}
                name={"name"}
                componentClass="select"
                value={value}
                onChange={this.onChange}>
                {
                  rowsPerPage.map(option => {
                    return <option key={option} value={option}>{option}</option>;
                  })
                }
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Well>
    );
  }
}

DataTableSettings.propTypes = {
  onChange: PropTypes.func,
  rowsPerPage: PropTypes.array,
  value: PropTypes.number
};

DataTableSettings.defaultProps = {
};

export default DataTableSettings;
