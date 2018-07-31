import React from 'react';
import { Col, Row } from 'reactstrap';
import Filters from '../components/Filters';
import Legend from '../components/Legend';
import { format, subMonths } from 'date-fns';
import Map from '../components/Map';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    // get default dates to set
    const { fromDate, toDate } = getDefaultDates();
    this.state = {
      modeSelection: 'all',
      dataset: 'crash',
      fromDate,
      toDate,
      updatedDate: '',
    };
  }

  // Update state when dataset selection changes
  datasetChange = dataset => {
    this.setState({ dataset });
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

  // Set last updated date
  setLastUpdatedDate = mapLastUpdatedDate => {
    this.setState({ updatedDate: mapLastUpdatedDate });
  };

  // Select which features to add to map
  makeFeaturesQuery = (modeSelection, fromDate, toDate, dataset) => {
    // set date field based on selected dataset
    const datefield = dataset == 'crash' ? 'dispatch_ts' : 'date_time';
    // Here we deal with timezones :)
    const fromDateWithTimeZone = `${fromDate} 05:00:00`;
    const toDateWithTimeZone = `${toDate} 05:00:00`;

    // Here we deal with timezones - we set the filter hours to always be
    // at 5am for the selected day so things look right to us here on the
    // east coast (except for during daylight savings).
    const fromDateWithTimeZone = `${fromDate} 05:00:00`;
    const toDateWithTimeZone = `${toDate} 05:00:00`;

    // set query for when all modes are selected (just use dates to filter)
    const allModesSelected = `${datefield} >= 
      '${fromDateWithTimeZone}' AND ${datefield} <= '${toDateWithTimeZone}'`;

    // set query for when one mode is selected
    const oneModeSelected = `mode_type =
      '${modeSelection}' AND 
      ${datefield} >= '${fromDateWithTimeZone}' AND 
      ${datefield} <= '${toDateWithTimeZone}'`;

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
            dataset={this.state.dataset}
            datasetChange={this.datasetChange}
          />
          <p className="font-italic ml-1">
            Data updated as of: {this.state.updatedDate}
          </p>
          {/* add legend twice - once for when screen is large 
            and it should display above the map, and once for when 
            screen is small and it should display below the map */}
          <Col className="p-0 d-none d-lg-block">
            <Legend />
          </Col>
        </Col>
        <Col lg="9" className="p-lg-0 pr-md-5 pl-md-5">
          <Map
            modeSelection={this.state.modeSelection}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            dataset={this.state.dataset}
            makeFeaturesQuery={this.makeFeaturesQuery}
            updateDate={this.setLastUpdatedDate}
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

// set default dates for map load data gets added
// a few months behind, so:
// "from" is 6 months ago
// "to" is 4 months ago
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
