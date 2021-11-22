import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const buttons = {
      padding: '14px',
      backgroundColor: '#6B94A4',
      color: 'white',
    };
    return (
        <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.open}
            trigger={<Button size='large' style={buttons}>Choose Location</Button>}
            size='tiny'
        >
          <Modal.Header>Report an Animal in Distress</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <LoadScript
                  googleMapsApiKey="AIzaSyDhBkwVGUxSvmwjOzUhxpyyT56N26kNFLE"
              >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={ (e) => { console.log(e.latLng.lat(), e.latLng.lng()); }}
                >
                  { /* Child components, such as markers, info windows, etc. */ }
                  <></>
                  <Marker
                      onLoad={onLoad}
                      position={position}
                      draggable={true}
                      onDrag={(e) => { console.log(e.latLng.lat(), e.latLng.lng()); }}
                  />
                </GoogleMap>
              </LoadScript>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReportModal);
