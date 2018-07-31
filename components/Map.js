import React from 'react';
import PropTypes from 'prop-types';
import { getTime, format } from 'date-fns';
import FeatureCounts from '../components/FeatureCounts';

// We can't import these server-side because they require "window"
const mapboxgl = process.browser ? require('mapbox-gl') : null;
// Despite using mapboxgl to render the map, we still use esri-leaflet to
// query to the layer
const { featureLayer } = process.browser ? require('esri-leaflet') : {};

const crashes_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/crashes_vision_zero/FeatureServer/0';

const fatalities_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/fatalities_vision_zero/FeatureServer/0';

class MapboxMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointCount: 0,
      lastUpdatedDate: '',
    };
  }

  componentDidMount() {
    // We set up esri-leaflet feature services for crashes and fatalities
    // that we query against for updating pointCount and lastUpdatedDate
    this.crashFeatureLayer = featureLayer({
      url: crashes_url,
    });

    this.fatalityFeatureLayer = featureLayer({
      url: fatalities_url,
    });

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [-71.067449, 42.352568],
      zoom: 13,
      style: {
        version: 8,
        // Despite mapbox enabling vector basemaps, we use our own tiled
        // basemap service to keep with city styling and branding
        sources: {
          'esri-grey': {
            type: 'raster',
            tiles: [
              'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
          'cob-basemap': {
            type: 'raster',
            tiles: [
              'https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: 'esri-grey',
            type: 'raster',
            source: 'esri-grey',
            minzoom: 0,
            maxzoom: 20,
          },
          {
            id: 'cob-basemap',
            type: 'raster',
            source: 'cob-basemap',
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      },
    });

    this.map.on('load', () => {
      // We add the crashes and fatalities layers as geojson
      this.map.addSource('crashes', {
        type: 'geojson',
        data: `${crashes_url}/query?where=1%3D1&outFields=*&outSR=4326&returnExceededLimitFeatures=true&f=pgeojson`,
      });

      this.map.addSource('fatalities', {
        type: 'geojson',
        data: `${fatalities_url}/query?where=1%3D1&outFields=*&outSR=4326&returnExceededLimitFeatures=true&f=pgeojson`,
      });

      // We want the map to show points at higher zoom levels and
      // a heat map at lower ones, so we add two layers for both
      // crashes and fatalities - a point layer and a heat layer -
      // and manipulate their properties so they only show at
      // certain zoom levels.
      this.map.addLayer({
        id: 'crashes-point',
        type: 'circle',
        source: 'crashes',
        paint: {
          // We set the circle fill and stroke color based on the
          // based on the crash's mode type
          'circle-color': {
            property: 'mode_type',
            type: 'categorical',
            stops: [['ped', '#c4291c'], ['bike', '#f4ae3d'], ['mv', '#3b90e3']],
          },
          'circle-stroke-color': {
            property: 'mode_type',
            type: 'categorical',
            stops: [['ped', '#8e1b11'], ['bike', '#bc7e2b'], ['mv', '#2564b1']],
          },
          'circle-stroke-width': 1,
          // We set the opacity of the circle layer to fade/appear
          // between zooms 11 and 12 to make room for our heatmap
          'circle-stroke-opacity': {
            stops: [[11, 0], [12, 1]],
          },
          'circle-opacity': {
            stops: [[11, 0], [12, 1]],
          },
        },
      });

      // Add point layer for fatalities
      this.map.addLayer({
        id: 'fatalities-point',
        type: 'circle',
        source: 'fatalities',
        paint: {
          // We set the circle fill and stroke color based on the
          // based on the fatality's mode type
          'circle-color': {
            property: 'mode_type',
            type: 'categorical',
            stops: [['PED', '#c4291c'], ['BIKE', '#f4ae3d'], ['MV', '#3b90e3']],
          },
          'circle-stroke-color': {
            property: 'mode_type',
            type: 'categorical',
            stops: [['PED', '#8e1b11'], ['BIKE', '#bc7e2b'], ['MV', '#2564b1']],
          },
          'circle-stroke-width': 1,
          // We set the opacity of the circle layer to fade/appear
          // between zooms 11 and 12 to make room for our heatmap
          'circle-stroke-opacity': {
            stops: [[11, 0], [12, 1]],
          },
          'circle-opacity': {
            stops: [[11, 0], [12, 1]],
          },
        },
      });

      // We add heatmap layers for both the crash and fatality data
      this.map.addLayer({
        id: 'crashes-heat',
        type: 'heatmap',
        source: 'crashes',
        paint: {
          // Increase intensity as zoom level decreases
          'heatmap-intensity': {
            stops: [[11, 1], [15, 3]],
          },
          // Assign color values be applied to points depending
          // on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(241,238,246,0.1)',
            0.2,
            'rgba(166,189,219,0.5)',
            0.4,
            'rgb(116,169,207)',
            0.6,
            'rgb(54,144,192)',
            0.8,
            'rgb(5,112,176)',
            1,
            'rgb(3,78,123)',
          ],
          // Increase radius as zoom increases
          'heatmap-radius': {
            stops: [[12, 11], [16, 15]],
          },
          // Decrease opacity to transition into the
          // circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [[12, 1], [13, 0]],
          },
        },
      });

      // Add heat map for fatalities
      this.map.addLayer({
        id: 'fatalities-heat',
        type: 'heatmap',
        source: 'fatalities',
        paint: {
          // Increase intensity as zoom level decreases
          'heatmap-intensity': {
            stops: [[11, 1], [15, 3]],
          },
          // Assign color values be applied to points depending
          // on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(241,238,246,0.1)',
            0.2,
            'rgba(166,189,219,0.5)',
            0.4,
            'rgb(116,169,207)',
            0.6,
            'rgb(54,144,192)',
            0.8,
            'rgb(5,112,176)',
            1,
            'rgb(3,78,123)',
          ],
          // Increase heat map radius as zoom increases
          // We keep fatalities at higher radius than crashes
          // as it is a sparser dataset
          'heatmap-radius': {
            stops: [[12, 15], [16, 20]],
          },
          // Decrease opacity to transition into the
          // circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [[12, 1], [13, 0]],
          },
        },
      });

      // We deafault to having crashes selected, so we set fatality layers
      // to not be visible to get started
      this.map.setLayoutProperty('fatalities-point', 'visibility', 'none');
      this.map.setLayoutProperty('fatalities-heat', 'visibility', 'none');

      // Set the default date filters for crashes
      const defaultFromDateFilter = [
        '>=',
        ['number', ['get', 'dispatch_ts']],
        getTime(this.props.fromDate),
      ];
      const defaultToDateFilter = [
        '<=',
        ['number', ['get', 'dispatch_ts']],
        getTime(this.props.toDate),
      ];
      this.map.setFilter('crashes-point', [
        'all',
        defaultFromDateFilter,
        defaultToDateFilter,
      ]);
      this.map.setFilter('crashes-heat', [
        'all',
        defaultFromDateFilter,
        defaultToDateFilter,
      ]);

      // Calculate the initial pointCount value
      const { allModesSelected } = this.props.makeFeaturesQuery(
        this.props.modeSelection,
        this.props.fromDate,
        this.props.toDate,
        this.props.dataset
      );
      this.updatePointCount(allModesSelected, this.props.dataset);

      // We query our crashes feature service to populate
      // the date the data was lasted updated
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
          // set last updated state for this component
          this.setState({ lastUpdatedDate: lastUpdate });
          // pass that date to the parent MapContainer component
          // so we can display that information under the filters
          this.props.updateDate(this.state.lastUpdatedDate);
        });
    });

    // Bind pop-ups for crash and fatality points
    this.map.on('click', e => {
      // Crash and fatalitiy points are often stacked on top of eachother
      // in the data. We want the pop-ups to show information about all
      // the crashes that occured in the clicked location.

      // We get the number of features at the clicked location
      const features = this.map.queryRenderedFeatures(e.point);
      const numFeatures = features.length;

      if (!features.length) {
        return;
      }

      // We determine the datefield to use depending on the
      // selected dataset
      const dateField =
        this.props.dataset == 'crash' ? 'dispatch_ts' : 'date_time';

      // We get the mode type and the date of each crash at the location
      const properties = features
        .map(feature => [
          feature.properties.mode_type,
          feature.properties[dateField],
        ])
        // We sort crashes listed in the pop-up by most-recent
        // to least recent
        .sort((a, b) => {
          return a[1] > b[1] ? -1 : 1;
        });

      new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(features[0].geometry.coordinates)
        // We put the number of crashes at the top of the popup, and
        // for each crash in the array of crashes clicked on,
        // we create a new element
        .setHTML(
          `<div style="min-width: 230px">
            <div>
                <ul class="dl dl--sm">
                  <li class="dl-i dl-i--b">
                    <div class="dl-d">${numFeatures} ${
            numFeatures > 1 ? 'crashes' : 'crash'
          }</div>
                  </li>        
                  <li class="dl-i dl-i--b">
                    <div class="dl-t">
                      ${properties
                        .map(
                          crash =>
                            `${format(crash[1], 'MM-DD-YY')}: ${crash[0]}<br/>`
                        )
                        .join('')}
                    </div>
                  </li>
                </ul>
            </div>`
        )
        .setLngLat(features[0].geometry.coordinates)
        .addTo(this.map);
    });

    // When we scroll over a point, change the mouse to a pointer.
    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['crashes-point', 'fatalities-point'],
      });

      features.length > 0
        ? (this.map.getCanvas().style.cursor = 'pointer')
        : (this.map.getCanvas().style.cursor = '');
    });
  }

  componentWillReceiveProps({ modeSelection, fromDate, toDate, dataset }) {
    // If the selected dataset is 'crash', we make sure the crashes layers are
    // visible and the fatalities are not. If the selected dataset is
    // 'fatalities', we do the opposite.
    if (this.props.dataset !== dataset) {
      if (dataset == 'crash') {
        this.map.setLayoutProperty('fatalities-point', 'visibility', 'none');
        this.map.setLayoutProperty('fatalities-heat', 'visibility', 'none');
        this.map.setLayoutProperty('crashes-point', 'visibility', 'visible');
        this.map.setLayoutProperty('crashes-heat', 'visibility', 'visible');
      } else {
        this.map.setLayoutProperty('crashes-point', 'visibility', 'none');
        this.map.setLayoutProperty('crashes-heat', 'visibility', 'none');
        this.map.setLayoutProperty('fatalities-point', 'visibility', 'visible');
        this.map.setLayoutProperty('fatalities-heat', 'visibility', 'visible');
      }
    }

    // Set the filter for mode - mapbox filters are case sensitive, so we
    // make the modeSelection uppercase when dealing with fatalities.
    const modeSelectionFilter =
      dataset == 'crash'
        ? ['==', ['string', ['get', 'mode_type']], modeSelection]
        : ['==', ['string', ['get', 'mode_type']], modeSelection.toUpperCase()];

    // Set the filters for the dates - using the time field for each dataset
    // and a unix timestamp of the selected date
    const fromDateFilter =
      dataset == 'crash'
        ? ['>=', ['number', ['get', 'dispatch_ts']], getTime(fromDate)]
        : ['>=', ['number', ['get', 'date_time']], getTime(fromDate)];
    const toDateFilter =
      dataset == 'crash'
        ? ['<=', ['number', ['get', 'dispatch_ts']], getTime(toDate)]
        : ['<=', ['number', ['get', 'date_time']], getTime(toDate)];

    // We use makeFeaturesQuery and updatePointCount to update the total crashes/fatalities
    // shown on the map. We still use esri-leaflet for this because there currently isn't a
    // reliable way to query features on a map through mapbox.
    const { allModesSelected, oneModeSelected } = this.props.makeFeaturesQuery(
      modeSelection,
      fromDate,
      toDate,
      dataset
    );

    // Determine what dataset has been selected so we can update it accordingly
    const selectedData =
      dataset == 'crash'
        ? ['crashes-point', 'crashes-heat']
        : ['fatalities-point', 'fatalities-heat'];

    // If the selected mode, fromDate, toDate, or dataset change, we update the
    // data and filters for the selected dataset.
    if (
      this.props.modeSelection !== modeSelection ||
      this.props.fromDate !== fromDate ||
      this.props.toDate !== toDate ||
      this.props.dataset !== dataset
    ) {
      // When the modeSelection is 'all', that filter should
      // not be applied to either dataset.
      if (modeSelection == 'all') {
        this.map.setFilter(selectedData[0], [
          'all',
          fromDateFilter,
          toDateFilter,
        ]);
        this.map.setFilter(selectedData[1], [
          'all',
          fromDateFilter,
          toDateFilter,
        ]);
        this.updatePointCount(allModesSelected, dataset);
      } else {
        this.map.setFilter(selectedData[0], [
          'all',
          modeSelectionFilter,
          fromDateFilter,
          toDateFilter,
        ]);
        this.map.setFilter(selectedData[1], [
          'all',
          modeSelectionFilter,
          fromDateFilter,
          toDateFilter,
        ]);
        this.updatePointCount(oneModeSelected, dataset);
      }
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  // Update features when user makes new selections
  updatePointCount = (query, dataset) => {
    // Set the featureLayer to update based on the selected dataset
    const selectedData =
      dataset == 'crash' ? this.crashFeatureLayer : this.fatalityFeatureLayer;

    // Query the layer based on the users selections and
    // return a count of features, use that count to updated pointCount
    selectedData
      .query()
      .where(query)
      .count((error, count) => {
        this.setState({ pointCount: count });
      });
  };

  // Make mode selection nicer for displaying in FeatureCounts
  formatModeSelection = modeSelection => {
    if (modeSelection == 'all') {
      return 'All';
    } else if (modeSelection == 'bike') {
      return 'Bike';
    } else if (modeSelection == 'mv') {
      return 'Motor vehicle';
    } else {
      return 'Pedestrian';
    }
  };

  // Make dataset selection nicer for displaying in FeatureCounts
  formatDataSelection = dataSelection => {
    return dataSelection == 'crash' ? 'crashes' : 'fatalities';
  };

  // Make selected dates nicer for displaying in FeatureCounts
  formatDate = date => {
    return format(date, 'MM/D/YY');
  };

  render() {
    return (
      <div>
        {/* make map take up entire viewport with room for the navbars */}
        <div
          style={{ height: 'calc(100vh - 125px)' }}
          ref={el => (this.mapContainer = el)}
        >
          <div style={{ zIndex: 1000, position: 'absolute' }}>
            <FeatureCounts
              pointCount={this.state.pointCount}
              mode={this.formatModeSelection(this.props.modeSelection)}
              dataset={this.formatDataSelection(this.props.dataset)}
              toDate={this.formatDate(this.props.toDate)}
              fromDate={this.formatDate(this.props.fromDate)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapboxMap;

MapboxMap.propTypes = {
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  modeSelection: PropTypes.string,
  makeFeaturesQuery: PropTypes.func,
  dataset: PropTypes.string,
  updateDate: PropTypes.func,
};
