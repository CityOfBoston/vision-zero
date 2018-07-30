import React from 'react';
import PropTypes from 'prop-types';
import { getTime, format } from 'date-fns';
import FeatureCounts from '../components/FeatureCounts';

const mapboxgl = process.browser ? require('mapbox-gl') : null;
const { featureLayer } = process.browser ? require('esri-leaflet') : {};

const crashes_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/crash_cad_all_v/FeatureServer/0';

const fatalities_url =
  'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/bpd_crashfatalities/FeatureServer/0';

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
    // that we query against for updating pointCount.
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
        sources: {
          'simple-tiles': {
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
            id: 'simple-tiles',
            type: 'raster',
            source: 'simple-tiles',
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
      // Add crashes source
      this.map.addSource('crashes', {
        type: 'geojson',
        data:
          'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/crash_cad_all_v/FeatureServer/0//query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
      });

      // Add fatalities source
      this.map.addSource('fatalities', {
        type: 'geojson',
        data:
          'https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/bpd_crashfatalities/FeatureServer/0//query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=',
      });

      // Add point layer for crashes
      this.map.addLayer({
        id: 'crashes-point',
        type: 'circle',
        source: 'crashes',
        paint: {
          // Increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [{ zoom: 11, value: 1 }, 5],
              [{ zoom: 11, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50],
            ],
          },
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
          // increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [{ zoom: 11, value: 1 }, 5],
              [{ zoom: 11, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50],
            ],
          },
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
          'circle-stroke-opacity': {
            stops: [[11, 0], [12, 1]],
          },
          'circle-opacity': {
            stops: [[11, 0], [12, 1]],
          },
        },
      });

      // Add heat map for crashes
      this.map.addLayer({
        id: 'crashes-heat',
        type: 'heatmap',
        source: 'crashes',
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [[1, 0], [62, 1]],
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [[12, 1], [15, 3]],
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(241,238,246,0)',
            0.2,
            'rgba(189,201,225,0.5)',
            0.4,
            'rgb(116,169,207)',
            0.6,
            'rgb(43,140,190)',
            0.8,
            'rgb(4,90,141)',
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [[12, 15], [16, 20]],
          },
          // decrease opacity to transition into the circle layer
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
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [[1, 0], [62, 1]],
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [[14, 1], [15, 0]],
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(241,238,246,0)',
            0.2,
            'rgba(189,201,225,0.5)',
            0.4,
            'rgb(116,169,207)',
            0.6,
            'rgb(43,140,190)',
            0.8,
            'rgb(4,90,141)',
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [[12, 15], [16, 20]],
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [[13, 1], [13, 0]],
          },
        },
      });

      // Set fatality layers to off as default
      this.map.setLayoutProperty('fatalities-point', 'visibility', 'none');
      this.map.setLayoutProperty('fatalities-heat', 'visibility', 'none');

      // Set the default date filters
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

      // Set query for setting initial pointCount
      const { allModesSelected } = this.props.makeFeaturesQuery(
        this.props.modeSelection,
        this.props.fromDate,
        this.props.toDate,
        this.props.dataset
      );
      this.updatePointCount(allModesSelected, this.props.dataset);
    });

    // Bind pop-ups for layers
    this.map.on('click', e => {
      const features = this.map.queryRenderedFeatures(e.point);

      if (!features.length) {
        return;
      }

      const feature = features[0];

      // Format dispatch timestamp to be readable for each dataset
      const formattedDate =
        this.props.dataset == 'crash'
          ? format(feature.properties.dispatch_ts, 'YYYY-MM-HH hh:mm:ss')
          : // Don't show the time on fatalities, just feels a little more respectful
            format(feature.properties.date_time, 'YYYY-MM-HH');

      const popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<div style="min-width: 230px">
            <div class="m-v200">
                <ul class="dl dl--sm">
                    <li class="dl-i"><span class="dl-d font-weight-bold">Crash type:</span> 
                    <span class="dl-t">${
                      feature.properties.mode_type
                    }</span></li>
                    <li class="dl-i"><span class="dl-d font-weight-bold">Time stamp:</span> 
                    <span class="dl-t">${formattedDate}</span></li>
                    <li class="dl-i"><span class="dl-d font-weight-bold">Mode type:</span> 
                    <span class="dl-t">${
                      feature.properties.location_type
                    }</span></li>
                </ul>
            </div>`
        )
        .setLngLat(feature.geometry.coordinates)
        .addTo(this.map);
    });

    // When we scroll over a layer with a tooltip,
    // change the mouse to a pointer.
    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['crashes-point', 'fatalities-point'],
      });

      if (features.length > 0) {
        this.map.getCanvas().style.cursor =
          features[0].properties.Name !== null ? 'pointer' : '';
      } else {
        this.map.getCanvas().style.cursor = '';
      }
    });
  }

  componentWillReceiveProps({ modeSelection, fromDate, toDate, dataset }) {
    // If the selected dataset is 'crash', make sure the crashes layers are
    // visible and the fatalities are not. If the selected dataset is
    // 'fatalities', do the opposite.
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

    // Set the filter for mode - mapbox filters are seemlingly case sensitive, so we
    // make the modeSelection uppercase when dealing with fatalities.
    const modeSelectionFilter =
      dataset == 'crash'
        ? ['==', ['string', ['get', 'mode_type']], modeSelection]
        : ['==', ['string', ['get', 'mode_type']], modeSelection.toUpperCase()];

    // Set the filters for the dates - using the time field for each dataset
    const fromDateFilter =
      dataset == 'crash'
        ? ['>=', ['number', ['get', 'dispatch_ts']], getTime(fromDate)]
        : ['>=', ['number', ['get', 'date_time']], getTime(fromDate)];
    const toDateFilter =
      dataset == 'crash'
        ? ['<=', ['number', ['get', 'dispatch_ts']], getTime(toDate)]
        : ['<=', ['number', ['get', 'date_time']], getTime(toDate)];

    // We use makeFeaturesQuery and updatePointCount to update the total crashes/fatalities
    // shown on the map. We still use esri-leaflet for this because there isn't a
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
    // If the mode, fromDate, toDate, or dataset change, we updated the
    // data and filters for the selected dataset.
    if (
      this.props.modeSelection !== modeSelection ||
      this.props.fromDate !== fromDate ||
      this.props.toDate !== toDate ||
      this.props.dataset !== dataset
    ) {
      // When the modeSelection is 'all', that filter should not be
      // applied.
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
    selectedData
      // Query the layer based on the users selections and
      // return a list of feature ids
      .query()
      .where(query)
      .count((error, count) => {
        // Use the length of the returned list to update pointCount
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
          <div
            style={{ zIndex: 1000, position: 'absolute', fontFamily: 'Lora' }}
          >
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
