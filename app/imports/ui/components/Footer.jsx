import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const menuStyle = { topPadding: '15px', textAlign: 'center', color: 'white', backgroundColor: '#145714', fontFamily: 'Playfair Display' };
    return (
      <footer>
        <div style={menuStyle}>
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
          <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
