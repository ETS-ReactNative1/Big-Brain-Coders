import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MoreInfo extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Header as='h1'>More Contact Information</Header>
          </Segment>
        </Container>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MoreInfo);
