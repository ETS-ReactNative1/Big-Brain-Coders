import React from 'react';
import { Tab, Menu, Container } from 'semantic-ui-react';
import MonkSeal from '../components/MonkSeal';
import SeaTurtle from '../components/SeaTurtle';
import SeaBird from '../components/SeaBird';
import MoreInfo from '../components/MoreInfo';

/** A simple static component to render some text for the landing page. */
class Contact extends React.Component {

  monkSeal = () => <MonkSeal/>;

  seaTurtle = () => <SeaTurtle/>;

  seaBird = () => <SeaBird/>;

  moreInfo = () => <MoreInfo/>;

    panes = [
    { menuItem: <Menu.Item key='monk-seal' id='monk-seal'>Hawaiian Monk Seal</Menu.Item>, render: this.monkSeal },
    { menuItem: <Menu.Item key='sea-turtle' id='sea-turtle'>Hawaiian Sea Turtles </Menu.Item>, render: this.seaTurtle },
    { menuItem: <Menu.Item key='sea-bird' id='sea-bird'>Hawaiian Sea Birds</Menu.Item>, render: this.seaBird },
    { menuItem: <Menu.Item key='more-info' id='more-info'>More Contact Information</Menu.Item>, render: this.moreInfo },
  ];

  render() {
    return (
        <div className="beachbglist">
        <Container id='contact-page'>
          <Tab menu={{ fluid: true, stackable: true, tabular: true }} panes={this.panes} id='tabs'/>
        </Container>
        </div>
    );
  }
}

export default Contact;
