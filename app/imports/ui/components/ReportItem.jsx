import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter, NavLink } from 'react-router-dom';
import { reportRemoveItMethod } from '../../api/report/ReportCollection.methods';

/** Renders a single row in the List Reports table. See pages/ListReports.jsx. */
class ReportItem extends React.Component {
  removeReport(docID) {
    reportRemoveItMethod.call(docID, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Report successfully removed', 'success')));
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell >
            <NavLink exact to={`/details/${this.props.report._id}`}>{this.props.report.date}</NavLink>
          </Table.Cell>
          <Table.Cell>{this.props.report.animal}</Table.Cell>
          <Table.Cell>{this.props.report.island}</Table.Cell>
          <Table.Cell>{this.props.report.beachName}</Table.Cell>
          <Table.Cell>{this.props.report.characteristics}</Table.Cell>
          <Table.Cell>{this.props.report.behavior}</Table.Cell>
          <Table.Cell>
            <Button circular onClick={() => this.removeReport(this.props.report._id) } icon='trash' color='red'/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ReportItem.propTypes = {
  report: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReportItem);
