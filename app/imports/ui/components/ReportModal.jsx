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
    };
    return (
        <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.open}
            trigger={<Button size='large' style={buttons}>Report an animal</Button>}
            size='small'
        >
          <Modal.Header>Report an Animal in Distress</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Thanks for using Coastar!</Header>
              <p>
                If you see an animal in distress, please contact the Hawaii Marine Animal Response at: <br/>
                (808) 123-4567
              </p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
  }
}

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReportModal);
