'use strict';
import React from 'react';
import DealHighlights from './DealHighlights/DealHighlights';
import DealSummary from './DealSummary/DealSummary';
import DealTypeSelector from './DealType/DealTypeSelector';
import Grid from '@coxautokc/fusion-ui-components/lib/Grid';
import Row from '@coxautokc/fusion-ui-components/lib/Row';
import Col from '@coxautokc/fusion-ui-components/lib/Col';
import Button from '@coxautokc/fusion-ui-components/lib/Button';

// eslint-disable-next-line react/prefer-stateless-function
class Content extends React.PureComponent {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={8} className="deal-detail-col">
            <DealHighlights />
            <DealTypeSelector htmlId="DealType" />
          </Col>
          <Col xs={4} className="deal-summary-col">
            <DealSummary htmlId="DealSummary" />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} className="commands-col">
            <Button htmlId='buttonSendOffer' className="pull-right" buttonStyle='primary'>Send Offer</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Content;
