/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import swal from 'sweetalert';
import { Grid, Image, Button, Header, Segment, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SubmitField,
  TextField,
  DateField,
  LongTextField,
  SelectField,
} from 'uniforms-semantic';
import { reportDefineMethod } from '../../api/report/ReportCollection.methods';

/** Create a schema to specify the structure of the data to appear in the report form. */
const formSchema = new SimpleSchema({
  date: String,
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
    allowedValues: ['Monk Seal', 'Sea Turtle', 'Dolphin', 'Whale', 'Seabird'],
    defaultValue: 'Monk Seal',
  },
  characteristics: String,
  behavior: String,
  numOfBeachgoers: Number,
  name: String,
  phoneNumber: String,
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
    };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    // console.log('AddStuff.submit', data);
    const {
      date, island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber,
    } = data;
    const owner = Meteor.user().username;
    const imageUrl = this.state.image;
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

  getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(this.showPosition));
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  showPosition = (position) => {
    this.setState({ latitude: position.coords.latitude });
    this.setState({ longitude: position.coords.longitude });
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

  openGallery = () => {
    /** Function that creates opens the GALLERY and sets the state to the image
     * NEED TO POST IMAGE TO CLOUDINARY AND SET STATE TO THAT URL INSTEAD OF LOCAL FILE */
    const srcType = Camera.PictureSourceType.PHOTOLIBRARY;
    const options = this.setOptions(srcType);

    navigator.camera.getPicture(cameraSuccess = (imageUri) => {
      this.uploadImg(imageUri);
    }, cameraError = (error) => {
      console.debug(`Unable to obtain picture: ${error}`, 'app');

    }, options);
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
    return (
        <Grid verticalAlign='middle' container centered stackable>
          <Grid.Column width={14}>
            <Header as="h2" textAlign="center">Add a Report</Header>
            <Link to={'/map'}>Big Map</Link>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Grid>
                  <DateField name='date' label='Date and Time' style={{ marginTop: '20px' }}/>
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
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={spacing}>
                    <Grid.Column width={7}>
                      <SelectField name='island'/>
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
                      <SelectField name='animal'/>
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
                      {
                        Meteor.isCordova === true &&
                        <Button
                            attached='bottom'
                            content='Take a picture'
                            onClick={this.openCamera}
                        />
                      }
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
                      {
                        Meteor.isCordova === true &&
                        <Button
                            attached='bottom'
                            content='Upload an image from gallery.'
                            onClick={this.openGallery}
                        />
                      }
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
    );
  }
}

export default Landing;
