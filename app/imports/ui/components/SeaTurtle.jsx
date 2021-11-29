import React from 'react';
import { Container, Grid, Header, Image, Segment, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SeaTurtle extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Grid stackable>
              <Grid.Column width={7}>
                <Header as='h1'> Hawaiian Sea Turtles</Header>
                <Image rounded size='large' src='../images/seaturtle.jpeg'/>
              </Grid.Column>
              <Grid.Column width={8} style={{ paddingLeft: '50px' }}>
                <Segment>
                  <Header as='h3'>
                    Sea turtles play an important role in Hawaiian tradition
                  </Header>
                  <List bulleted>
                    <List.Item>
                      The Hawaiian Green Sea turtle and the Hawksbill turtle are both mentioned in Kumulip, the
                      Hawaiian creation chant.
                    </List.Item>
                    <List.Item>
                      The green turtle is listed as a threatened species under the Endangered Species act, and is
                      commonly found throughout the Hawaiian Islands.
                    </List.Item>
                    <List.Item>
                      Some of the biggest threats to Hawaiian sea turtles are fisheries, boat strikes, pollution,
                      and human disturbance.
                    </List.Item>
                  </List>
                  <Header as='h3'>
                    Help Preserve Hawaiian Sea Turtles
                  </Header>
                  <List>
                    <List.Item>
                      Often times, Hawaiian sea turtles are seen resting on beaches, or feeding near the shoreline.
                      If you see one of these animals, please be sure to give these animals at least 10 feet of space
                      for your protection and theirs.
                    </List.Item>
                    <List.Item>
                      Avoid any disturbances to sea turtles, as this may cause stress to the animal.
                    </List.Item>
                    <List.Item>
                      For more information on Hawaiian sea turtles and how to protect them, please visit The
                      <a href='https://h-mar.org/about-the-animals/hawaii-sea-turtles/' target='_blank'
                         rel='noreferrer'>
                        <b> Hawaii Marine Animal Response (HMAR)</b></a> website.
                    </List.Item>
                    <List.Item>
                      If you see a Hawaiian sea turtle in distress,
                      please call the statewide hotline at <b> (808) 256-9840</b>.
                    </List.Item>
                  </List>
                </Segment>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SeaTurtle);
