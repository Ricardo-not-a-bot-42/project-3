import React from 'react';

import './style.scss';

const Footer = (props) => {
  return (
    <div>
      <footer className="footer">
        <small>© 2020 All rights reserved </small>

        <div className="person-group">
          <div className="person">
            <small>Leonor Ferreira</small>
            <div className="logos">
              <a href="https://www.linkedin.com/in/leonorferreira">
                <img className="social-media-logo" src="/images/linkedin.png" alt="linkedin-logo" />
              </a>
              <a href="https://github.com/nanori8">
                <img className="social-media-logo" src="/images/github.png" alt="github-logo" />
              </a>
            </div>
          </div>

          <div className="person">
            <small>Ricardo Loureiro</small>
            <div className="logos">
              <a href="https://www.linkedin.com/in/ricardo-loureiro-85b601152">
                <img className="social-media-logo" src="/images/linkedin.png" alt="linkedin-logo" />
              </a>
              <a href="https://github.com/Ricardo-not-a-bot-42">
                <img className="social-media-logo" src="/images/github.png" alt="github-logo" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
{
  /* <Route
path="/external"
component={() => {
  window.location = 'https://www.linkedin.com/in/leonorferreira/';
 
  return null;
}}
/> */
}
