/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import swal from 'sweetalert';
import { Grid, Image, Header, Segment, Icon, Button, Modal } from 'semantic-ui-react';
import Axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SubmitField,
  TextField,
  LongTextField,
  AutoField,
  SelectField,
} from 'uniforms-semantic';
import { reportDefineMethod } from '../../api/report/ReportCollection.methods';

/** Create a schema to specify the structure of the data to appear in the report form. */
const formSchema = new SimpleSchema({
  latitude: {
    type: Number,
    optional: true,
  },
  longitude: {
    type: Number,
    optional: true,
  },
  island: {
    type: String,
    allowedValues: ['Big Island', 'Oahu', 'Maui', 'Molokai', 'Kauai', 'Lanai', 'Niihau', 'Kahoolawe'],
    defaultValue: 'Oahu',
  },
  beachName: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  animal: {
    type: String,
    allowedValues: ['Monk Seal', 'Sea Turtle', 'Seabird'],
    defaultValue: 'Monk Seal',
  },
  characteristics: String,
  behavior: String,
  numOfBeachgoers: Number,
  name: String,
  phoneNumber: String,
  owner: String,
});

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      loader1: false,
      loader2: false,
      latitude: 0,
      longitude: 0,
      owner: '',
      open: false,
      zoom: 10,
      center: {
        lat: 21.45076858088362,
        lng: -158.00057723373996,
      },
    };
  }

  /** On submit, insert the data. */
  submitMobile(data, formRef) {
    // console.log('AddStuff.submit', data);
    this.shareLocation();
    const {
      island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber, owner,
    } = data;
    const imageUrl = this.state.image;
    const date = new Date();
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({
          date, latitude, longitude, island, beachName, description,
          animal, characteristics, behavior, numOfBeachgoers, name, phoneNumber, imageUrl, owner,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            this.setState({ image: '' });
            // console.log('Success');
          }
        });
  }

  submitDesktop(data, formRef) {
    const {
      island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber, owner,
    } = data;
    const imageUrl = this.state.image;
    const date = new Date();
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({
          date, latitude, longitude, island, beachName, description,
          animal, characteristics, behavior, numOfBeachgoers, name, phoneNumber, imageUrl, owner,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            this.setState({ image: '' });
            // console.log('Success');
          }
        });
  }

  closeModal = () => {
    this.setState({ open: false });
  }

  uploadImg = (files) => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('cloud_name', 'glarita');
    data.append('upload_preset', 'Big-Brain-Coders');
    Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', data).then((res) => {
      console.log(res.data.url);
      this.setState({ image: res.data.url });
      this.setState({ loader2: false });
    });
  };

  setOptions = (srcType) => {
    /**  Helper function to set options required for cordova-plugin-camera */
    const options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      // eslint-disable-next-line no-undef
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true,
    };
    return options;
  }

  openCamera = () => {
    /** Function that creates opens the CAMERA and sets the state to the image
     * NEED TO POST IMAGE TO CLOUDINARY AND SET STATE TO THAT URL INSTEAD OF LOCAL FILE */
    const srcType = Camera.PictureSourceType.CAMERA;
    const options = this.setOptions(srcType);

    navigator.camera.getPicture(cameraSuccess = (imageUri) => {
      this.uploadImg(imageUri);
    }, cameraError = (error) => {
      console.debug(`Unable to obtain picture: ${error}`, 'app');

    }, options);
  }

  shareLocation = () => {
    coords = navigator.geolocation.getCurrentPosition(success = (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, error = (error) => {
      console.debug(`Unable to obtain location: ${error}`);
    }, { enableHighAccuracy: true });
  }

  render() {
    let fRef = null;
    const spacing = {
      marginTop: '0px',
      paddingTop: '0px',
    };
    const containerStyle = {
      width: '858px',
      height: '600px',
    };
    const position = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };
    const buttons = {
      borderRadius: '5px',
      padding: '12px',
      backgroundColor: '#6B94A4',
      color: 'white',
      fontSize: '13px',
    };
    const zoom = 7;

    const onLoad = marker => {
      console.log('marker: ', marker);
    };
    if (Meteor.isCordova) {
      // Beware really ugly code duplication.
      // This is mobile view
      return (
          <div style={{ marginTop: '20px' }}>
            <Grid verticalAlign='middle' container centered stackable>
              <Grid.Column width={14}>
                <Header as="h2" textAlign="center">Submit a Report</Header>
                <AutoForm ref={ref => {
                  fRef = ref;
                }} schema={formSchema} onSubmit={data => this.submitMobile(data, fRef)}>
                  <Segment>
                    <Grid>
                      <Grid.Row style={spacing}>
                        <Grid.Column width={7}>
                          <SelectField name='island'/>
                        </Grid.Column>
                        <Grid.Column width={9}>
                          <AutoField name='beachName' label='Beach Name'/>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Column width={16} style={spacing}>
                        <LongTextField name='description'/>
                      </Grid.Column>
                      <Grid.Row style={spacing}>
                        <Grid.Column width={8}>
                          <AutoField name='animal'/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <TextField name='characteristics'/>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Column width={16} style={spacing}>
                        <LongTextField name='behavior'/>
                      </Grid.Column>
                      <Grid.Row style={spacing}>
                        <Grid.Column width={3}>
                          <NumField name='numOfBeachgoers' label='Number of Nearby People' decimal={false}/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <TextField name='name'/>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <TextField name='phoneNumber'/>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={spacing}>
                        <Grid.Column width={8}>
                          <Button
                              attached='bottom'
                              content='Take a picture'
                              onClick={this.openCamera}
                          />
                          <Grid.Column floated='right'>
                            {
                              this.state.image &&
                              <Image size='small' src={this.state.image}/>
                            }
                          </Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={3}>
                        </Grid.Column>
                        <Grid.Column width={16}>
                          <SubmitField value='Submit' style={{ marginTop: '20px' }}/>
                        </Grid.Column>
                      </Grid.Row>
                      <ErrorsField/>
                    </Grid>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </div>
      );
    }
    return (
        // This is desktop view
        <div style={{ marginTop: '20px' }}>
          <Grid verticalAlign='middle' container centered stackable>
            <Grid.Column width={14}>
              <Header as="h2" textAlign="center" inverted>Submit a Report</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submitDesktop(data, fRef)}>
                <Segment>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column computer={7} mobile={16}>
                        <SelectField name='island'/>
                      </Grid.Column>
                      <Grid.Column computer={9} mobile={16}>
                        <TextField name='beachName' label='Beach Name'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Column width={16} style={spacing}>
                      <LongTextField name='description'/>
                    </Grid.Column>
                    <Grid.Row style={spacing}>
                      <Grid.Column computer={8} mobile={16}>
                        <SelectField name='animal'/>
                      </Grid.Column>
                      <Grid.Column computer={8} mobile={16}>
                        <TextField name='characteristics'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Column width={16} style={spacing}>
                      <LongTextField name='behavior'/>
                    </Grid.Column>
                    <Grid.Row style={spacing}>
                      <Grid.Column computer={3} mobile={16}>
                        <NumField name='numOfBeachgoers' label='# of People' decimal={false}/>
                      </Grid.Column>
                      <Grid.Column computer={8} mobile={16}>
                        <TextField name='name'/>
                      </Grid.Column>
                      <Grid.Column computer={5} mobile={16}>
                        <TextField name='phoneNumber'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={spacing}>
                      <Grid.Column computer={8} mobile={16}>
                        <p style={{ marginBottom: '5px', fontSize: '13px' }}><strong>Upload Image</strong>
                          <strong style={{ color: '#DA2828' }}> *</strong>
                        </p>
                        <input
                            style={{ marginTop: '0px' }}
                            type="file"
                            name="file"
                            id="files"
                            onChange={(event) => {
                              this.uploadImg(event.target.files);
                              this.setState({ loader2: true });
                            }}
                        />
                        <Grid.Column floated='right'>
                          {this.state.loader2 === true &&
                          <Header as='h4' style={{ marginTop: '5px' }}>
                            <Icon loading name='spinner' size='small' color='green'/>Image uploading
                          </Header>
                          }
                          {
                            this.state.image &&
                            <Image size='small' src={this.state.image}/>
                          }
                        </Grid.Column>
                      </Grid.Column>
                      <Grid.Column computer={8} mobile={16}>
                        <TextField name='owner' label='Email'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column computer={14} mobile={11}>
                        <Modal
                            onClose={() => this.setState({ open: false })}
                            onOpen={() => this.setState({ open: true })}
                            open={this.state.open}
                            trigger={<Button size='small' style={buttons} type='button'>Choose Location</Button>}
                        >
                          <Modal.Header>Choose Location</Modal.Header>
                          <Modal.Content image>
                            <Modal.Description>
                              <Header as='h4'>Placing a Marker</Header>
                              <p>Select the location of the sighted animal. Once a location is selected, a marker will
                                be placed at the specified location. You will also be able to <br/>
                                drag the marker if you would like the location to be more accurate. <br/>
                                Once complete, you may close this window.
                              </p>
                              <LoadScript
                                  googleMapsApiKey={Meteor.settings.public.googleMapsKEY}
                              >
                                <div className='modal'>
                                  <GoogleMap
                                      mapContainerStyle={containerStyle}
                                      center={this.state.center}
                                      zoom={zoom}
                                      onClick={(e) => {
                                        console.log(e.latLng.lat(), e.latLng.lat());
                                        this.setState({ latitude: e.latLng.lat() });
                                        this.setState({ longitude: e.latLng.lng() });
                                      }}
                                  >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                    <Marker
                                        onLoad={onLoad}
                                        position={position}
                                        draggable={true}
                                        onDrag={(e) => {
                                          this.setState({ latitude: e.latLng.lat() });
                                          this.setState({ longitude: e.latLng.lng() });
                                        }}
                                    />
                                  </GoogleMap>
                                </div>
                              </LoadScript>
                            </Modal.Description>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button color='black' onClick={this.closeModal}>
                              Close
                            </Button>
                          </Modal.Actions>
                        </Modal>
                      </Grid.Column>
                      <div className='modal'>
                      <Grid.Column computer={2} floated='right'>
                        <SubmitField value='Submit'/>
                      </Grid.Column>
                      </div>
                    </Grid.Row>
                    <ErrorsField/>
                  </Grid>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
