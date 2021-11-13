/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import swal from 'sweetalert';
import { Grid, Image, Button, Header, Segment, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, DateField, LongTextField } from 'uniforms-semantic';
import { reportDefineMethod } from '../../api/report/ReportCollection.methods';
// import ReportMapComponent from '../components/ReportMapComponent';

/** Create a schema to specify the structure of the data to appear in the report form. */
const formSchema = new SimpleSchema({
  date: String,
  latitude: Number,
  longitude: Number,
  island: String,
  beachName: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  animal: String,
  characteristics: String,
  behavior: String,
  numOfBeachgoers: Number,
  name: String,
  phoneNumber: String,
});

/** A simple static component to render some text for the landing page. */
const center = {
    lat: 21.330970673074834,
    lng: -157.69216914705936,
};
const zoom = 11;
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      loader: false,
    };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    // console.log('AddStuff.submit', data);
    const { date, latitude, longitude, island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber } = data;
    const owner = Meteor.user().username;
    const imageUrl = this.state.image;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({ date, latitude, longitude, island, beachName, description,
          animal, characteristics, behavior, numOfBeachgoers, name, phoneNumber, imageUrl, owner },
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

  getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition());
    }
  }

  showPosition = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }

  uploadImg = (files) => {
    const data = new FormData();
    data.append('file', files[0]);
    data.append('cloud_name', 'glarita');
    data.append('upload_preset', 'Big-Brain-Coders');
    Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', data).then((res) => {
      console.log(res.data.url);
      this.setState({ image: res.data.url });
      this.setState({ loader: false });
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
                            this.setState({ loader: true });
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
                        { this.state.loader === true &&
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
          <Grid.Column width={12}>
            <Segment>
              <div style={{ height: '75vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: Meteor.settings.public.googleMaps }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onClick={e => {
                      console.log(e.lat());
                    }}
                />
              </div>
            </Segment>
            <Button onClick={() => { navigator.geolocation.getCurrentPosition(this.showPosition); }}>get location</Button>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
