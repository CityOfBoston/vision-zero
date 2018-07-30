import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default function FeatureCounts(props) {
  return (
    <Row>
      <Col sm="12" style={{ opacity: 0.9 }}>
        <div className="bg-light m-0 p-2">
          <div className="p-2">
            <h5 className="m-0 font-weight-bold text-uppercase">
              Citywide Totals
            </h5>
            <hr className="m-1" />
            <h6 className="mt-2 font-italic">
              {props.mode} {props.dataset}: {props.pointCount}
            </h6>
            <p className="mt-2 mb-0 font-italic" style={{ fontSize: '.8rem' }}>
              {props.fromDate} to {props.toDate}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

FeatureCounts.propTypes = {
  pointCount: PropTypes.number,
  mode: PropTypes.string,
  dataset: PropTypes.string,
  toDate: PropTypes.string,
  fromDate: PropTypes.string,
};
