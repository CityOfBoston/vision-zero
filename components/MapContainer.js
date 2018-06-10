import React from 'react';
import { Col, Row } from 'reactstrap';
import Filters from '../components/Filters';
import Map from '../components/Map';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    // get default dates to set
    const { fromDate, toDate } = getDefaultDates();
    this.state = {
      modeSelection: 'all',
      fromDate,
      toDate,
    };
  }

  // Update state when mode selection changes
  filterModes = modeSelection => {
    this.setState({ modeSelection });
  };

  // Update state when fromDate value changes
  filterFromDate = e => {
    this.setState({ fromDate: e.target.value });
  };

  // Update state when toDate value changes
  filterToDate = e => {
    this.setState({ toDate: e.target.value });
  };

  // Select which features to add to map
  makeFeaturesQuery = (modeSelection, fromDate, toDate) => {
    // set query for when "all" modes are selected
    const allModesSelected = `dispatch_ts >=
      '${fromDate}' AND 
      dispatch_ts <= '${toDate}'`;

    // set query for when one mode is selected
    const oneModeSelected = `mode_type =
      '${modeSelection}' AND 
      dispatch_ts >= '${fromDate}' AND 
      dispatch_ts <= '${toDate}'`;

    return {
      allModesSelected,
      oneModeSelected,
    };
  };

  render() {
    return (
      <Row>
        <Col lg="3">
          <Filters
            fromDate={this.state.fromDate}
            fromChange={this.filterFromDate}
            toDate={this.state.toDate}
            toChange={this.filterToDate}
            modeSelection={this.state.modeSelection}
            modeChange={this.filterModes}
          />
        </Col>
        <Col lg="9">
          <Map
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            modeSelection={this.state.modeSelection}
            makeFeaturesQuery={this.makeFeaturesQuery}
          />
        </Col>
      </Row>
    );
  }
}

export default MapContainer;

// set default months - we start with 2 months ago because data is always two months behind
const getDefaultDates = () => {
  const date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  const twoMonth = mm - 2;
  const threeMonths = mm - 3;
  const from = yyyy + '-' + '0' + threeMonths + '-' + dd;
  const to = yyyy + '-' + '0' + twoMonth + '-' + dd;
  return {
    fromDate: from,
    toDate: to,
  };
};
