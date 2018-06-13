import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default function FeatureCounts(props) {
  return (
    <Row>
      <Col sm="12" md="3">
        <div className="bg-light m-2" style={{ opacity: 0.9 }}>
          <div className="p-2">
            <h5 className="m-0 font-weight-bold text-uppercase">
              Citywide Totals
            </h5>
            <hr className="m-1" />
            <h6 className="mt-2 font-italic">
              All Injury Crashes: {props.crashCounts}
            </h6>
            <p className="font-italic">Data as of: {props.lastUpdatedDate}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

FeatureCounts.propTypes = {
  crashCounts: PropTypes.number,
  lastUpdatedDate: PropTypes.string,
};
