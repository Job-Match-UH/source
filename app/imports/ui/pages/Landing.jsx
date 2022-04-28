import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id='landing-page' className='landing'>
        <Container>
          <Grid textAlign='center' padded='vertically'>
            <Grid.Row column={2}>
              <Grid.Row width={4}>
                <Image src="https://github.com/Job-Match-UH/source/blob/main/images/uhmLOGO.png?raw=true" size='small' centered />
                <Header className='landing-text' style={ { fontSize: 'xxx-large' } }> We are Job Match UH </Header> <br/>
              </Grid.Row>
              <Grid.Row width={4}>
                <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                  This site is a way for local and non-local companies who want to recruit students from UH to make their (potential) opportunities known to students.</Header>
                <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                  Students can create profiles on the site with their interests and search for companies.
                </Header>
                <Grid container stackable columns='equal' textAlign='center'>
                  <Grid.Column>
                    <Image src="/images/signup-page.png" rounded/>
                  </Grid.Column>
                  <Grid.Column>
                    <Image src="/images/createstudentprofile.png" rounded/>
                  </Grid.Column>
                </Grid>
                <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                  Companies can create job profiles on the site and specify requirements per job.
                </Header>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
