import React from 'react';

import './GoogleAttribution.css';
import attributionImg from './powered_by_google_on_white_hdpi.png';

function GoogleAttribution(props) {
  return (
    <a
      href="https://www.google.com/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src={attributionImg}
        alt="Powered by Google"
        className="google-attribution"
      />
    </a>
  );
}

export default GoogleAttribution;
