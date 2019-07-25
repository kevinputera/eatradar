import React from 'react';

import './GoogleAttribution.css';
import attributionImg from './powered_by_google_on_white_hdpi.png';

function GoogleAttribution(props) {
  return (
    <img
      src={attributionImg}
      alt="Powered by Google"
      className="google-attribution"
    />
  );
}

export default GoogleAttribution;
