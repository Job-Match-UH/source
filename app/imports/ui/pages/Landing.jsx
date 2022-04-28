import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id='landing-page' style={ { backgroundColor: '#eff3f1' } }>
        <Container style={ { backgroundColor: '#eff3f1' } }>
          <Grid textAlign='center' padded='vertically'>
            <Grid.Row column={2}>
              <Grid.Row width={4}>
                <Image src="https://github.com/Job-Match-UH/source/blob/main/images/uhmLOGO.png?raw=true" size='small' centered />
                <Header className='landing-text' style={ { fontSize: 'xxx-large' } }> We are Job Match UH </Header> <br/>
              </Grid.Row>
              <Grid.Row width={4}>
                <div>
                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    This site is a way for local and non-local companies who want to recruit students from UH to make their (potential) opportunities known to students.</Header>
                </div>
                <div>
                  <br/>
                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    Start by logging in or creating a new account.</Header>
                  <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/login-page.png?raw=true" rounded/>
                </div>
                <div>
                  <br/>
                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    Students can create profiles detailed with their interests, education, and projects.
                  </Header>
                  <Grid container stackable columns='equal' textAlign='center'>
                    <Grid.Column>
                      <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/register-page.png?raw=true" rounded/>
                    </Grid.Column>
                    <Grid.Column>
                      <br/><br/><br/><br/>
                      <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/createstudentprofile.png?raw=true" rounded/>
                    </Grid.Column>
                  </Grid>
                </div>
                <div>
                  <br/>
                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    Companies can create profiles detailed with their desired interests and job listings.
                  </Header>
                  <Grid container stackable columns='equal' textAlign='center'>
                    <Grid.Column>
                      <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/registercompany.png?raw=true" rounded/>
                    </Grid.Column>
                    <Grid.Column>
                      <br/><br/>
                      <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/createcompanyprofile.png?raw=true" rounded/>
                    </Grid.Column>
                  </Grid>
                </div>
                <div>
                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    Students can view company profiles, their job listings, and match with them by interests.
                  </Header>
                  <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/studenthomepage.png?raw=true" rounded/>

                  <Header className='landing-text' style={ { textAlign: 'center', fontSize: 'x-large', marginRight: 50, marginLeft: 50 } }>
                    Companies can view student profiles, add jobs to their listings page, and match with students based on interests.
                  </Header>
                  <Image src="https://github.com/Job-Match-UH/source/blob/issue-56/images/companyhomepage.png?raw=true" rounded/>
                </div>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Landing;
