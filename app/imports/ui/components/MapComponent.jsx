import React from 'react';
import { Meteor } from 'meteor/meteor';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItem from './StuffItem';
import { Reports } from '../../api/report/ReportCollection';
import Pins from './Pins';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapComponent extends React.Component {
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
          <GoogleMapReact
              bootstrapURLKeys={{ key: Meteor.settings.public.googleMaps }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
          >
            {this.props.reports.map((reports) => <Pins key={reports._id} reports={reports} />)}
            {/*<AnyReactComponent*/}
            {/*    lat={21.330970673074834}*/}
            {/*    lng={-157.69216914705936}*/}
            {/*    text="My Marker"*/}
            {/*/>*/}
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
