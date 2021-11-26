import React from 'react';
import { Container, Grid, Header, Image, List, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MonkSeal extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Grid stackable>
              <Grid.Column width={7}>
                <Header as='h1'> Hawaiian Monk Seal</Header>
                <Image rounded size='large' src='../images/monkseal.jpeg'/>
              </Grid.Column>
              <Grid.Column width={8} style={{ paddingLeft: '50px' }}>
                <Segment>
                  <Header as='h3'>
                    The Hawaiian Monk Seal is one of the most endangered animals in the world.
                  </Header>
                  <List bulleted>
                    <List.Item>It is the only tropical seal species left in the world,
                      and only lives in Hawaiian waters.
                    </List.Item>
                    <List.Item>
                      There are barely 1400 Hawaiian Monk Seals left in the world,
                      most of which live on around uninhabited Hawaiian islands.
                    </List.Item>
                    <List.Item>
                      Humans have been the only impact on the Hawaiian Monk Seals species,
                      and it is up to humans to help the species survive and recover.
                    </List.Item>
                  </List>
                  <Header as='h3'>
                    Help Preserve the Hawaiian Monk Seal
                  </Header>
                  <List>
                    <List.Item>
                      Many times, Hawaiian Monk Seals are seen resting on beaches. If you see one of these animals,
                      please be sure to give these animals space for your protection and theirs.
                    </List.Item>
                    <List.Item>
                      If one of these animals approaches you, please be sure to maintain your distance.
                    </List.Item>
                    <List.Item>
                      For more information on Hawaiian Monk Seals, Please visit The
                      <a href='https://h-mar.org/about-the-animals/monk-seal/' target='_blank'
                         rel='noreferrer'>
                        <b> Hawaii Marine Animal Response (HMAR)</b></a> website.
                    </List.Item>
                    <List.Item>
                      If you see a Hawaiian Monk Seal in distress,
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
export default withRouter(MonkSeal);
