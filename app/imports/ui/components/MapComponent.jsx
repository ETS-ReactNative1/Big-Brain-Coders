import React from 'react';
import { Meteor } from 'meteor/meteor';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapComponent extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
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
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text={"hello"}
            />
          </GoogleMapReact>
        </div>
    );
  }
}

export default MapComponent;
