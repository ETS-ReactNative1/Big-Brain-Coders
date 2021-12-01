import React from 'react';
import { Container, Grid, Loader, Image, Table, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Reports } from '../../api/report/ReportCollection';
import { NavLink } from 'react-router-dom';

/** Renders a page to view individual reports in more detail */
class ReportPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const cellStyle = {
        fontWeight: 'bold'
    }
    return (
        <Container style={{ marginTop: '100px' }}>
            <Grid relaxed stackable columns={2}>
                <Grid.Column>
                    <Image style={{ border: '5px solid #ffffff' }} fluid src={this.props.report.imageUrl}/>
                </Grid.Column>
                <Grid.Column>
                    <Table striped>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Date/Time</Table.Cell>
                            <Table.Cell>{this.props.report.date}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Animal</Table.Cell>
                            <Table.Cell>{this.props.report.animal}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Characteristics</Table.Cell>
                            <Table.Cell>{this.props.report.characteristics}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Behavior</Table.Cell>
                            <Table.Cell>{this.props.report.behavior}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Location</Table.Cell>
                            <Table.Cell>{this.props.report.beachName}<br/>{this.props.report.description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Number of Beachgoers</Table.Cell>
                            <Table.Cell>{this.props.report.numOfBeachgoers}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Observer Name</Table.Cell>
                            <Table.Cell>{this.props.report.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={cellStyle}>Observer Contact Number</Table.Cell>
                            <Table.Cell>{this.props.report.phoneNumber}</Table.Cell>
                        </Table.Row>
                    </Table>
                    <Button inverted as={NavLink} exact to={`/reports`}>
                        Back to all reports
                    </Button>
                </Grid.Column>
            </Grid>
        </Container>
    );
  }
}

/** Require an array of Report documents in the props. */
ReportPage.propTypes = {
  report: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Report document according to the report ID.
  const reportID = match.params._id;
  const subscription = Reports.subscribeReportAdmin();
  const report =  Reports.find({ _id: reportID }).fetch()[0];
  return {
    report,
    ready: subscription.ready(),
  };
})(ReportPage);
