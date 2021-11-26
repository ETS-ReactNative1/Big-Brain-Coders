import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MoreInfo extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Header as='h1'>Contact Information for HMAR</Header>
            <p>
              Hawaii Marine Animal Response<br/>
              Mailing Address: 150 Hamakua Drive, #350, Kailua, HI 96734<br/>
              Physical Address: 905 Kalanianaole Hwy.,
              Building 21, Kailua, HI 96734 (Call 808-220-7802 to arrange a visit) <br/>
              Email: info@h-mar.org<br/>
              Marine protected species hotline: (888) 256-9840<br/>
              All other calls: (888) 476-HMAR
            </p>
          </Segment>
        </Container>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MoreInfo);
