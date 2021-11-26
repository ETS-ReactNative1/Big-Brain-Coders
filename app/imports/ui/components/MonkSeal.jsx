import React from 'react';
import { Container, Header, Image, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MonkSeal extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Header as='h1'> Hawaiian Monk Seal</Header>
            <Image size='large' src='../images/seal.jpeg'/>
          </Segment>
        </Container>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MonkSeal);
