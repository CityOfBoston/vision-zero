import React from 'react';
import PropTypes from 'prop-types';
import FeatureCounts from '../components/FeatureCounts';
import { format } from 'date-fns';

// We can't import these server-side because they require "window"
const L = process.browser ? require('leaflet') : null;
const { basemapLayer, tiledMapLayer, featureLayer } = process.browser
  ? require('esri-leaflet')
  : {};

const basemap_url =
  'https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer';

const feature_service_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/crash_cad_all_v/FeatureServer/0';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crashCounts: 0,
      lastUpdatedDate: '',
    };
  }

  map = null;

  setMapEl = el => {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    if (!el) {
      return;
    }

    // Bind leaflet map to html element
    this.map = L.map(el, {
      center: [42.318432, -71.079687],
      zoom: 12,
    });

    // Set zoom control position
    this.map.zoomControl.setPosition('bottomleft');

    // Load in icons for symbology
    const icons = {
      ped: new L.Icon({
        iconUrl: './static/marker-11-red.svg',
        iconSize: [20, 20],
      }),
      mv: new L.Icon({
        iconUrl: './static/marker-11-blue.svg',
        iconSize: [20, 20],
      }),
      bike: new L.Icon({
        iconUrl: './static/marker-11-yellow.svg',
        iconSize: [20, 20],
      }),
    };

    // Add feature layer
    this.featureLayer = featureLayer({
      url: feature_service_url,
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: icons[geojson.properties.mode_type.toLowerCase()],
        });
      },
      onEachFeature: this.bindPopUp,
    });

    // Set features to load based on the default from and to dates
    const { allModesSelected } = this.makeFeaturesQuery(
      this.props.modeSelection,
      this.props.fromDate,
      this.props.toDate
    );

    this.featureLayer.setWhere(allModesSelected);

    // Add basemap layers and features to map
    this.map
      .addLayer(basemapLayer('Gray'))
      .addLayer(tiledMapLayer({ url: basemap_url }))
      .addLayer(this.featureLayer);

    // Query for feature counts and update this.state.crashCounts
    this.updateFeatures(allModesSelected);

    // Query for last updated date
    this.featureLayer
      .query()
      .where('1=1')
      .orderBy('dispatch_ts', 'DESC')
      .run((error, featureCollection) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return;
        }
        const mostRecentFeature = new Date(
          featureCollection.features[0].properties.dispatch_ts
        );
        const lastUpdate = format(mostRecentFeature, 'MM/YYYY');
        this.setState({ lastUpdatedDate: lastUpdate });
      });
  };

  componentWillReceiveProps({ modeSelection, fromDate, toDate }) {
    const { allModesSelected, oneModeSelected } = this.makeFeaturesQuery(
      modeSelection,
      fromDate,
      toDate
    );

    if (
      this.props.modeSelection !== modeSelection ||
      this.props.fromDate !== fromDate ||
      this.props.toDate !== toDate
    ) {
      if (modeSelection == 'all') {
        this.updateFeatures(allModesSelected);
      } else {
        this.updateFeatures(oneModeSelected);
      }
    }
  }

  // Set popup for features
  bindPopUp = (feature, layer) => {
    // Format dispatch timestamp to be readable
    const formattedDate = format(
      feature.properties.dispatch_ts,
      'YYYY-MM-HH hh:mm:ss'
    );

    // Assemble the HTML for the markers' popups (Leaflet's bindPopup method doesn't accept React JSX)
    const popupContent = `<div style="font-family:'Roboto'"><p><strong>Crash Type:</strong> ${
      feature.properties.mode_type
    }<br><strong>Dispatch Time Stamp:</strong> ${formattedDate}
      <br><strong>Location Type:</strong> ${
        feature.properties.location_type
      }</p></div>`;

    // Add our popups to the features
    layer.bindPopup(popupContent);
  };

  makeFeaturesQuery = (modeSelection, fromDate, toDate) => {
    // set query for when "all" modes are selected
    const allModesSelected = `dispatch_ts >=
      '${fromDate}' AND 
      dispatch_ts <= '${toDate}'`;

    // set query for when one mode is selected
    const oneModeSelected = `mode_type =
      '${modeSelection}' AND 
      dispatch_ts >= '${fromDate}'AND 
      dispatch_ts <= '${toDate}'`;

    return {
      allModesSelected,
      oneModeSelected,
    };
  };

  updateFeatures = query => {
    this.featureLayer.setWhere(query, () => {
      // use _currentSnapshot to update the feature count after re-setting the map
      const numFeatures = this.featureLayer._currentSnapshot.length;
      this.setState({ crashCounts: numFeatures });
    });
  };

  render() {
    return (
      <div>
        <div style={{ height: '600px' }} ref={this.setMapEl}>
          <div
            style={{ zIndex: 1000, position: 'relative', fontFamily: 'Roboto' }}
          >
            <FeatureCounts
              crashCounts={this.state.crashCounts}
              lastUpdatedDate={this.state.lastUpdatedDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  modeSelection: PropTypes.string,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
};

export default Map;
