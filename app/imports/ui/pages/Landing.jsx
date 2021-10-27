import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Button} from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  handleClick = () => {
    console.log('hi');
//    if (Meteor.isCordova) {
//      navigator.camera.getPicture(image => {
//        this.setState({
//          image,
//        });
//        console.log(this.state);
//      }, console.log);
//    } else console.log('please run the cordova project');
  };

  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to this template</h1>
            <p>Now get to work and modify this app!</p>
            <Button
                attached='bottom'
                content='Click'
                onClick={this.handleClick}
            />
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
