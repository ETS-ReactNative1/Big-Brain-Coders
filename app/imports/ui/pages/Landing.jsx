/* eslint-disable no-undef */
// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
    };
  }

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
      const data = new FormData();
      data.append('imageFile', imageUri);
      data.append('cloud_name', 'glarita');
      data.append('upload_preset', 'Big-Brain-Coders');
      Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', data).then((r) => {
        console.log(r.data.url);
        this.setState({ image: r.data.url });
      });
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
      this.setState({ image: imageUri });
    }, cameraError = (error) => {
      console.debug(`Unable to obtain picture: ${error}`, 'app');

    }, options);
  }

  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
            <Link to={'/map'}>Big Map</Link>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <Button
                attached='bottom'
                content='Take a picture'
                onClick={this.openCamera}
            />
            <Button
                attached='bottom'
                content='Upload an image from gallery.'
                onClick={this.openGallery}
            />
            <Image size='small' src={this.state.image} />
            <p>Now get to work and modify this app!</p>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
