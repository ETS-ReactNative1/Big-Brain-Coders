/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import swal from 'sweetalert';
import { Grid, Image, Button, Header, Segment, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, LongTextField, AutoField, SelectField } from 'uniforms-semantic';
import { reportDefineMethod } from '../../api/report/ReportCollection.methods';

/** Create a schema to specify the structure of the data to appear in the report form. */
const formSchema = new SimpleSchema({
  latitude: {
    type: String,
    optional: true,
  },
  longitude: {
    type: String,
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
});

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      loader: false,
      latitude: 0,
      longitude: 0,
    };
  }

  /** On submit, insert the data. */
  submitMobile(data, formRef) {
    // console.log('AddStuff.submit', data);
    this.shareLocation();
    const { island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber } = data;
   // const owner = Meteor.user().username;
    const imageUrl = this.state.image;
    const date = new Date();
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({ date, latitude, longitude, island, beachName, description,
          animal, characteristics, behavior, numOfBeachgoers, name, phoneNumber, imageUrl },
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
    this.shareLocation();
    const { longitude, latitude, island, beachName, description, animal, characteristics,
      behavior, numOfBeachgoers, name, phoneNumber } = data;
    // const owner = Meteor.user().username;
    const imageUrl = this.state.image;
    const date = new Date();
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    reportDefineMethod.call({ date, latitude, longitude, island, beachName, description,
          animal, characteristics, behavior, numOfBeachgoers, name, phoneNumber, imageUrl },
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
    if (Meteor.isCordova) {
      // Beware really ugly code duplication.
      // This is mobile view
      return (
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
      );
    }
    return (
        // This is desktop view
        <Grid verticalAlign='middle' container centered stackable>
          <Grid.Column width={14}>
            <Header as="h2" textAlign="center">Add a Report</Header>
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
                            this.setState({ loader: true });
                          }}
                      />
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
        </Grid>
    );
  }
}

export default Landing;
