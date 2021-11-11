import React from 'react';
import { Meteor } from 'meteor/meteor';
import GoogleMapReact from 'google-map-react';
import InfoWindow from 'google-map-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Dropdown, Label, Menu } from 'semantic-ui-react';
import { Reports } from '../../api/report/ReportCollection';
import Pins from './Pins';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
  }

  onMarkerClick = (props, marker) => this.setState({
        activeMarker: marker,
        selectedPlace: props,
        showingInfoWindow: true,
      });

  onInfoWindowClose = () => this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
 this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
    }
  };

  static optionsArray = [
    {
      key: 'All',
      text: 'All',
      value: 'All',
    },
    {
      key: 'Date',
      text: 'Date',
      value: 'Date',
    },
    {
      key: 'Island',
      text: 'Island',
      value: 'Island',
    },
    {
      key: 'Animal',
      text: 'Animal',
      value: 'Animal',
    },
  ];

  pinData() {
    const pinItems = this.props.reports.filter((value) => {
      if (this.state.filter === 'All' || this.state.filter === '') {
        return value;
      }
      if (this.state.filter === 'Date') {
        if (value.date.toLowerCase().includes(this.state.search.toLowerCase())) {
          return value;
        }
      } else if (this.state.filter === 'Island') {
        if (value.island.toString().toLowerCase().includes(this.state.search.toLowerCase())) {
          return value;
        }
      } else if (this.state.filter === 'Animal') {
        if (value.animal.toString().toLowerCase().includes(this.state.search.toLowerCase())) {
          return value;
        }
      }
      return null;
    }).map(report => (
      <Pins key={report._id}
            lat={report.latitude}
            lng={report.longitude}
            date={report.date}
            text={report.animal}
            reports={report}
            search={this.state.search}
            filter={this.state.filter}
            onClick={this.onMarkerClick}
            name={report.animal}

      >
      <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
      >
          <div>
              <h4>{this.state.selectedPlace.name}</h4>
          </div>
      </InfoWindow>
      </Pins>));

    return pinItems;
  }

  static defaultProps = {
    center: {
      lat: 21.330970673074834,
      lng: -157.69216914705936,
    },
    zoom: 11,
  };

  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <Label>Search:</Label>
          <input icon='search' placeholder='Search...' type="text"
                 onChange={
                   (event) => this.setState({ search: event.target.value })
                 }/>
          <Menu.Item>
            <Dropdown
                icon='filter'
                floating
                labeled
                button
                placeholder='Filter'
                selection
                options={MapComponent.optionsArray}
                onChange={(e, data) => {
                  this.setState({ filter: data.value });
                  console.log(data.value);
                }}
            />
          </Menu.Item>

          <GoogleMapReact
              bootstrapURLKeys={{ key: Meteor.settings.public.googleMaps }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onClick={this.onMapClicked}
          >
            {this.pinData()}
          </GoogleMapReact>
        </div>
    );
  }
}

MapComponent.propTypes = {
  reports: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Reports.subscribeReport();
  return {
    reports: Reports.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MapComponent);
