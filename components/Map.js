import React from 'react';
import PropTypes from 'prop-types';
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

const fatalities_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/bpd_crashfatalities/FeatureServer/0';

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
      zoom: 13,
    });

    // Set zoom control position
    this.map.zoomControl.setPosition('topright');

    // Load in icons for symbology
    const icons = {
      ped: new L.Icon({
        iconUrl: './static/marker-11-red.svg',
        iconSize: [30, 30],
      }),
      mv: new L.Icon({
        iconUrl: './static/marker-11-blue.svg',
        iconSize: [30, 30],
      }),
      bike: new L.Icon({
        iconUrl: './static/marker-11-yellow.svg',
        iconSize: [30, 30],
      }),
    };

    // Add crash feature layer
    this.crashFeatureLayer = featureLayer({
      url: feature_service_url,
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: icons[geojson.properties.mode_type.toLowerCase()],
        });
      },
      onEachFeature: this.bindPopUp,
    });

    // Set features to load based on the default from and to dates
    const { allModesSelected } = this.props.makeFeaturesQuery(
      this.props.modeSelection,
      this.props.fromDate,
      this.props.toDate,
      this.props.dataset
    );

    this.crashFeatureLayer.setWhere(allModesSelected);

    // Add fatalities feature layer to map
    this.fatalityFeatureLayer = featureLayer({
      url: fatalities_url,
      pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
          icon: icons[geojson.properties.mode_type.toLowerCase()],
        });
      },
      onEachFeature: this.bindPopUp,
    });

    this.fatalityFeatureLayer.setWhere(allModesSelected);

    // Add basemap layers and features to map
    this.map
      .addLayer(basemapLayer('Gray'))
      .addLayer(tiledMapLayer({ url: basemap_url }))
      .addLayer(this.crashFeatureLayer);

    // Query for feature counts and update this.state.crashCounts
    this.updateFeatures(allModesSelected, this.props.dataset);

    // Query for last updated date
    this.crashFeatureLayer
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

  // Update query and features when new selections are made
  componentWillReceiveProps({ modeSelection, fromDate, toDate, dataset }) {
    const { allModesSelected, oneModeSelected } = this.props.makeFeaturesQuery(
      modeSelection,
      fromDate,
      toDate,
      dataset
    );

    // If the selected dataset has changed, remove the previous one from the map
    if (this.props.dataset !== dataset) {
      dataset == 'crash'
        ? this.map.removeLayer(this.fatalityFeatureLayer)
        : this.map.removeLayer(this.crashFeatureLayer);
    }

    if (
      this.props.modeSelection !== modeSelection ||
      this.props.fromDate !== fromDate ||
      this.props.toDate !== toDate ||
      this.props.dataset !== dataset
    ) {
      if (modeSelection == 'all') {
        this.updateFeatures(allModesSelected, dataset);
      } else {
        this.updateFeatures(oneModeSelected, dataset);
      }
    }
  }

  // Update features when user makes new selections
  updateFeatures = (query, dataset) => {
    // Make sure the selected dataset is added to the map, update features based
    // on other selections
    dataset == 'crash'
      ? this.crashFeatureLayer.addTo(this.map).setWhere(query)
      : this.fatalityFeatureLayer.addTo(this.map).setWhere(query);
  };

  // Set popup for features
  bindPopUp = (feature, layer) => {
    // Format dispatch timestamp to be readable for each dataset
    const formattedDate =
      this.props.dataset == 'crash'
        ? format(feature.properties.dispatch_ts, 'YYYY-MM-HH hh:mm:ss')
        : // Don't show the time on fatalities, just feels a little more respectful
          format(feature.properties.date_time, 'YYYY-MM-HH');

    // Assemble the HTML for the markers' popups (Leaflet's bindPopup method doesn't accept React JSX)
    const popupContent = `
    <div style="min-width: 230px">
      <div class="m-v200">
          <ul class="dl dl--sm">
              <li class="dl-i"><span class="dl-d font-weight-bold">Crash type:</span> 
              <span class="dl-t">${feature.properties.mode_type}</span></li>
              <li class="dl-i"><span class="dl-d font-weight-bold">Time stamp:</span> 
              <span class="dl-t">${formattedDate}</span></li>
              <li class="dl-i"><span class="dl-d font-weight-bold">Mode type:</span> 
              <span class="dl-t">${feature.properties.location_type}</span></li>
          </ul>
      </div>`;

    // Add our popups to the features
    layer.bindPopup(popupContent);
  };

  render() {
    return (
      <div>
        {/* make map take up entire viewport with room for the navbars */}
        <div style={{ height: 'calc(100vh - 125px)' }} ref={this.setMapEl}>
          <div
            style={{
              zIndex: '1000',
              position: 'relative',
              fontFamily: 'Roboto',
            }}
          />
        </div>
      </div>
    );
  }
}

export default Map;

Map.propTypes = {
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  modeSelection: PropTypes.string,
  makeFeaturesQuery: PropTypes.func,
  dataset: PropTypes.string,
};
