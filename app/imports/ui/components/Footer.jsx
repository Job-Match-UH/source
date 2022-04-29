import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const color = '#2d5144';
    const menuStyle = { topPadding: '30px', color: 'white', textAlign: 'center', backgroundColor: color, opacity: 1, fontFamily: 'Playfair Display' };
    const headerStyle = { color: 'white', fontFamily: 'Playfair Display' };
    const githubLink = 'https://job-match-uh.github.io/';
    const templateLink = 'http://ics-software-engineering.github.io/meteor-application-template-react';
    return (
      <footer className='footer'>
        <div style={menuStyle}>
          <br/>
          <p style={headerStyle}>Department of Information and Computer Sciences  •  University of Hawaii  •  Honolulu, HI 96822</p>
          <a href={githubLink} target="_blank" rel="noreferrer">Github Project Page</a> • <a href={templateLink} target="_blank" rel="noreferrer">Template Link</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
