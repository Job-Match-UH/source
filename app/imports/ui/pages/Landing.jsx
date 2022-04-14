import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const colorGreen = { color: 'green' };
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
        <Grid.Row column={2} >
          <Grid.Column width={4}>
            <Icon name={'users'} size={'massive'} color='green'/>
            <Header as={'h1'} style={colorGreen}> About Us </Header>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as={'h4'} style={colorGreen}>This site is a way for local and non-local companies who want
              to recruit students from UH to make their (potential) opportunities known to
              students. Students can create profiles on the site with their interests and
              search for companies. Companies can create job profiles on the site and
              specify requirements per job.</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
