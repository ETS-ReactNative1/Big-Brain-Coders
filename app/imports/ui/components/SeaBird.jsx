import React from 'react';
import { Container, Header, Image, Segment, Grid, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SeaBird extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Grid stackable>
              <Grid.Column width={7}>
            <Header as='h1'> Hawaiian Sea Birds</Header>
            <Image rounded size='large' src='../images/seabird.jpeg'/>
              </Grid.Column>
              <Grid.Column width={8} style={{ paddingLeft: '50px' }}>
                <Segment>
                  <Header as='h3'>
                    Help Preserve Hawaiian Sea Birds
                  </Header>
                  <List>
                    <List.Item>
                      If you see a downed sea bird, determine if it needs to be rescued.
                      If you see young birds near their nest or burrows, these birds should be left alone and
                      no intervention is needed.
                    </List.Item>
                    <List.Item>
                      If a bird is found unresponsive, it most likely needs to be rescued.
                    </List.Item>
                    <List.Item>
                      Do not give food or water to the bird and do not leave any in the container you may have placed
                      the animal into.
                    </List.Item>
                    <List.Item>
                      For more information on Hawaiian sea turtles and how to protect them, please visit The
                      <a href='https://h-mar.org/about-the-animals/hawaii-seabirds/' target='_blank'
                         rel='noreferrer'>
                        <b> Hawaii Marine Animal Response (HMAR)</b></a> website.
                    </List.Item>
                    <List.Item>
                      If you see a Hawaiian sea bird in distress,
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
export default withRouter(SeaBird);
