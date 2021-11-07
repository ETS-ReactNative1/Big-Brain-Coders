import React from 'react';
import { Meteor } from 'meteor/meteor';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/ReportCollection';
import Pins from './Pins';
import { Dropdown, Label, Menu } from 'semantic-ui-react';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
    };
  }

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
      key: 'Beach',
      text: 'Beach',
      value: 'Beach',
    },
    {
      key: 'Animal',
      text: 'Animal',
      value: 'Animal',
    },
    {
      key: 'Behavior',
      text: 'Behavior',
      value: 'Behavior',
    },
  ];

  static defaultProps = {
    center: {
      lat: 21.330970673074834,
      lng: -157.69216914705936,
    },
    zoom: 11,
  };

  render() {
    console.log(Meteor.settings.public.googleMaps);
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
                  console.log(data.value);
                  this.setState({ filter: data.value });
                }}
            />
          </Menu.Item>
          <GoogleMapReact
              bootstrapURLKeys={{ key: Meteor.settings.public.googleMaps }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
          >
            {
              this.props.reports.map(report => (
                  <Pins key={report.date}
                        lat={report.latitude}
                        lng={report.longitude}
                        reports={report}
                        search={this.state.search}
                        filter={this.state.filter}
                  />
                ))
            }
            {/* {this.props.reports.map((reports) => <Pins key={reports._id} reports={reports} />)} */}
            {/* <AnyReactComponent */}
            {/*    lat={21.330970673074834} */}
            {/*    lng={-157.69216914705936} */}
            {/*    text="My Marker" */}
            {/* /> */}
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
