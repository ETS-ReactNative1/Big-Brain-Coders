/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import swal from 'sweetalert';
import { Grid, Image, Header, Segment, Icon, Button, Modal } from 'semantic-ui-react';
import Axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
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
    allowedValues: ['Oahu', 'Maui', 'Big Island', 'Kauai'],
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
    allowedValues: ['Turtle', 'Seal', 'Seabird'],
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
      latitude: '',
      longitude: '',
      owner: '',
      open: false,
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
    // console.log('AddStuff.submit', data);
    // this.shareLocation();
    const {
      latitude, longitude, island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber, owner,
    } = data;
    const imageUrl = this.state.image;
    const date = new Date();
    let getLat = '';
    let getLong = '';
    if (this.state.latitude && this.state.longitude) {
      getLat = this.state.latitude;
      getLong = this.state.longitude;
    } else {
      getLat = latitude;
      getLong = longitude;
    }
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({
          date, getLat, getLong, island, beachName, description,
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

  displayImage = (imgUri) => {

    const elem = document.getElementById('imageFile');
    elem.src = imgUri;
    return elem.src;
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

  showPosition = (position) => {
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
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
    const button = {
      borderRadius: '10px',
      backgroundColor: '#298EC2',
      color: 'white',
      padding: '12px',
    };
    const containerStyle = {
      width: '858px',
      height: '600px',
    };
    const center = {
      lat: 21.45076858088362,
      lng: -158.00057723373996,
    };
    const position = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };
    const buttons = {
      padding: '14px',
      backgroundColor: '#6B94A4',
      color: 'white',
    };
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
                <Header as="h2" textAlign="center">Add a Report</Header>
                <Link to={'/map'}>Big Map</Link>
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
              <Header as="h2" textAlign="center" inverted>Add a Report</Header>
              <Link to={'/map'}>Big Map</Link>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submitDesktop(data, fRef)}>
                <Segment>
                  <Grid>
                    <Grid.Row style={spacing}>
                      <Grid.Column width={8}>
                        <NumField name='latitude'/>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <NumField name='longitude'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={spacing} centered columns={1}>
                      <Grid.Column>
                        <Button onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(this.showPosition);
                            this.setState({ loader1: true });
                          } else {
                            x.innerHTML = 'Geolocation is not supported by this browser.';
                          }
                        }
                        } type='button' size='small' style={button}>Use Current Location</Button>
                        {this.state.loader1 === true && !this.state.latitude && !this.state.longitude &&
                        <Header as='h4' style={{ marginTop: '5px' }}>
                          <Icon loading name='spinner' size='small' color='green'/>Locating..
                        </Header>
                        }
                        {this.state.latitude && this.state.longitude &&
                        <Header as='h4' style={{ marginTop: '15px' }}>
                          Latitude: {this.state.latitude}, Longitude: {this.state.longitude}
                        </Header>
                        }

                        <Modal
                            onClose={() => this.setState({ open: false })}
                            onOpen={() => this.setState({ open: true })}
                            open={this.open}
                            trigger={<Button size='large' style={buttons} type='button'>Choose Location</Button>}
                        >
                          <Modal.Header>Choose Location</Modal.Header>
                          <Modal.Content image>
                            <Modal.Description>
                              <LoadScript
                                  googleMapsApiKey={Meteor.settings.public.googleMapsKEY}
                              >
                                <div className='modal'>
                                  <GoogleMap
                                      mapContainerStyle={containerStyle}
                                      center={center}
                                      zoom={10}
                                      onClick={(e) => {
                                        console.log(e.latLng.lat(), e.latLng.lng());
                                      }}
                                  >
                                    { /* Child components, such as markers, info windows, etc. */}
                                    <></>
                                    <Marker
                                        onLoad={onLoad}
                                        position={position}
                                        draggable={true}
                                        onDrag={(e) => {
                                          console.log(e.latLng.lat(), e.latLng.lng());
                                        }}
                                    />
                                  </GoogleMap>
                                </div>
                              </LoadScript>
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={spacing}>
                      <Grid.Column width={7}>
                        <TextField name='island'/>
                      </Grid.Column>
                      <Grid.Column width={9}>
                        <TextField name='beachName' label='Beach Name'/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Column width={16} style={spacing}>
                      <LongTextField name='description'/>
                    </Grid.Column>
                    <Grid.Row style={spacing}>
                      <Grid.Column width={8}>
                        <TextField name='animal'/>
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
                        <NumField name='numOfBeachgoers' label='# of People' decimal={false}/>
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
                      <Grid.Column width={8}>
                        <TextField name='owner' label='Email'/>
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
}

export default Landing;
