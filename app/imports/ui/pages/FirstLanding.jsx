import React from 'react';
import { Button, Grid, Header, List, ListContent, ListHeader, ListItem } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReportModal from '../components/ReportModal';

/** A simple static component to render some text for the landing page. */
class FirstLanding extends React.Component {
  render() {
    const header = {
      fontSize: '40px',
    };
    const buttons = {
      padding: '14px',
      backgroundColor: '#6B94A4',
      color: 'white',
    };
    const listColor = {
     color: 'white',
    };
    return (
        <div className="landing">
        <Grid verticalAlign='middle' stackable container>
          <Grid.Row columns={2}>
            <Grid.Column computer={9}>
              <Header style={header} inverted>Saving Hawaii&apos;s marine wildlife <br/> one animal at a time.</Header>
              <List>
                <ListItem>
                  <ListHeader style={listColor}>Report a Sighting</ListHeader>
                  <ListContent style={listColor}>If you spot an endangered marine animal,
                    please fill out our sighting report
                  </ListContent>
                </ListItem>
                <ListItem>
                  <ListHeader style={listColor}>Report an Animal in Distress</ListHeader>
                  <ListContent style={listColor}>If you spot an endangered marine animal,
                    please fill out our sighting report
                  </ListContent>
                </ListItem>
              </List>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered column={2}>
            <Grid.Column computer={14} style={{ paddingRight: 0 }}>
              <div className='landing-buttons'>
                  <Button size='large' style={buttons} as={Link} to='/report'>Report a sighting</Button>
                <div className='divider'/>
                <ReportModal/>
              </div>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
    );
  }
}

export default FirstLanding;
