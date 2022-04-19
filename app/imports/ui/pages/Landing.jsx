import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <Grid textAlign='center' style={{ paddingTop: '180px' }}>
          <Grid.Row column={2}>
            <Grid.Column width={4}>
              <Header className='landing-text' style={ { fontSize: 'xxx-large' } }> About Us </Header>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header className='landing-text' style={ { fontSize: 'xx-large' } }>This site is a way for local and non-local companies who want
              to recruit students from UH to make their (potential) opportunities known to
              students. Students can create profiles on the site with their interests and
              search for companies. Companies can create job profiles on the site and
              specify requirements per job.</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
