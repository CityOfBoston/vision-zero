import React from 'react';
import { Col } from 'reactstrap';

// We can't import these server-side because they require "window"
const L = process.browser ? require('leaflet') : null;
const { basemapLayer, tiledMapLayer, featureLayer } = process.browser
  ? require('esri-leaflet')
  : {};

const basemap_url =
  'https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer';

const feature_service_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/crash_cad_all_v/FeatureServer/0';

export default class Map extends React.Component {
  map = null;

  setMapEl = el => {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    if (!el) {
      return;
    }
    // Load in icons for symbology
    // TODO: Get correct icons
    const icons = {
      ped: new L.Icon({
        iconUrl: '../static/t.svg',
        iconSize: [20, 20],
      }),
      mv: new L.Icon({
        iconUrl: '../static/b.svg',
        iconSize: [20, 20],
      }),
      bike: new L.Icon({
        iconUrl: '../static/cone.svg',
        iconSize: [20, 20],
      }),
    };

    // Set up THE MAP
    this.map = L.map(el)
      .setView([42.357004, -71.062309], 12)

      // Add crash data and symbolize by the type of crash
      .addLayer(
        featureLayer({
          url: feature_service_url,
          pointToLayer: function(geojson, latlng) {
            return L.marker(latlng, {
              icon: icons[geojson.properties.mode_type.toLowerCase()],
            });
          },
        })
      )
      // Boston basemap only includes Boston, so we layer over Esri's "Gray"
      // basemap.
      .addLayer(basemapLayer('Gray'))
      .addLayer(tiledMapLayer({ url: basemap_url }));
  };

  componentWillReceiveProps() {
    // Check if mode filter has changed
  }

  render() {
    return <div style={{ height: 500 }} ref={this.setMapEl} />;
  }
}
