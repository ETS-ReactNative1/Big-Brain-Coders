import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const buttons = {
      padding: '14px',
      backgroundColor: '#6B94A4',
      color: 'white',
    };
    return (
        <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.open}
            trigger={<Button size='large' style={buttons}>Report an animal</Button>}
            size='tiny'
        >
          <Modal.Header>Report an Animal in Distress</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>See an animal in trouble?</Header>
              <p>
                If you see an animal in distress, entangled, or injured,
                please contact the <br/>  Hawaii Marine Animal Response hotline at: <br/>
                <b><a href='tel:8087481831'>(888) 256-9840</a></b>
                <br/>
                <br/>
                For more information, please see our <b>Contact</b> page.
              </p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReportModal);
