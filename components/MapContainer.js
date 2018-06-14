import React from 'react';
import { Col, Row } from 'reactstrap';
import Filters from '../components/Filters';
import Map from '../components/Map';
import Legend from '../components/Legend';
import { format, subMonths } from 'date-fns';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    // get default dates to set
    const { fromDate, toDate } = getDefaultDates();
    this.state = {
      modeSelection: 'all',
      dataSet: 'crash',
      fromDate,
      toDate,
    };
  }

  // Update state when dataset selection changes
  dataSetChange = dataSet => {
    this.setState({ dataSet });
  };

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
  makeFeaturesQuery = (modeSelection, fromDate, toDate, dataSet) => {
    // set date field based on selected dataset
    const datefield = dataSet == 'crash' ? 'dispatch_ts' : 'date_time';

    // set query for when all modes are selected (just use dates to filter)
    const allModesSelected = `${datefield} >= 
      '${fromDate}' AND ${datefield} <= '${toDate}'`;

    // set query for when one mode is selected
    const oneModeSelected = `mode_type =
      '${modeSelection}' AND 
      ${datefield} >= '${fromDate}' AND 
      ${datefield} <= '${toDate}'`;

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
            dataSet={this.state.dataSet}
            dataSetChange={this.dataSetChange}
          />
          {/* add legend twice - once for when screen is large 
            and it should display above the map, and once for when 
            screen is small and it should display below the map */}
          <Col className="p-0 d-none d-lg-block">
            <Legend />
          </Col>
        </Col>
        <Col lg="9" className="p-lg-0 pr-md-4 pl-md-4">
          <Map
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            modeSelection={this.state.modeSelection}
            makeFeaturesQuery={this.makeFeaturesQuery}
            dataSet={this.state.dataSet}
          />
          {/* second instance of the legend component for when 
          screen is small */}
          <Col className="d-sm-block d-md-block d-lg-none pl-0">
            <Legend />
          </Col>
        </Col>
      </Row>
    );
  }
}

export default MapContainer;

// set default months - we start with 2 months ago because data is always two months behind
const getDefaultDates = () => {
  const today = new Date();
  const fourMonthsAgo = subMonths(today, 4);
  const sixMonthsAgo = subMonths(today, 6);
  const from = format(sixMonthsAgo, 'YYYY-MM-DD');
  const to = format(fourMonthsAgo, 'YYYY-MM-DD');

  return {
    fromDate: from,
    toDate: to,
  };
};
