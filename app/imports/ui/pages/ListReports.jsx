import React from 'react';
import { Container, Table, Header, Loader, Button, Pagination, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reports } from '../../api/report/ReportCollection';
import ReportItem from '../components/ReportItem';

/** Renders a table containing all of the Report documents. Use <ReportItem> to render each row. */
class ListReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ activePage });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  handleExportCSV = () => {

    const fields = ['date', 'animal', 'island', 'beachName', 'characteristics', 'behavior',
    'numOfBeachgoers', 'name', 'phoneNumber'];

    const { Parser } = require('json2csv');
    const reports = Reports.find({}).fetch();
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(reports);

    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'reports.csv';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const rep = Reports.find({}).fetch();
    return (
        <div className="beachbglist">
        <Container style={{ marginTop: '50px' }}>
          <Header as="h2" textAlign="center" inverted>Reports</Header>
          <Table striped selectable singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date/Time</Table.HeaderCell>
                <Table.HeaderCell>Animal</Table.HeaderCell>
                <Table.HeaderCell>Island</Table.HeaderCell>
                <Table.HeaderCell>Beach Name</Table.HeaderCell>
                <Table.HeaderCell>Characteristics</Table.HeaderCell>
                <Table.HeaderCell>Behavior</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* eslint-disable-next-line max-len */}
              {this.props.reports.slice((this.state.activePage - 1) * 5, this.state.activePage * 5).map((report) => <ReportItem key={report._id} report={report} />)}
            </Table.Body>
          </Table>
          <Button inverted onClick={this.handleExportCSV}
                  style={{ marginTop: '5px', marginBottom: '15px' }}>Export Data</Button>
          <div>
            <Pagination
                activePage={this.state.activePage}
                totalPages={Math.ceil(rep.length / 5)}
                firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
                lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
                prevItem={{ content: <Icon name='angle left'/>, icon: true }}
                nextItem={{ content: <Icon name='angle right'/>, icon: true }}
                onPageChange={this.handlePageChange}
            />
          </div>
        </Container>
        </div>
    );
  }
}

/** Require an array of Report documents in the props. */
ListReports.propTypes = {
  reports: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Report documents.
  const subscription = Reports.subscribeReportAdmin();
  const reports = Reports.find({}).fetch();
  return {
    reports,
    ready: subscription.ready(),
  };
})(ListReports);
