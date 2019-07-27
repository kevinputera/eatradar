import React from 'react';

import './YelpAttribution.css';
import attributionImg from './Yelp_trademark_RGB_outline.png';

function YelpAttribution(props) {
  return (
    <a
      href="https://www.yelp.com/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src={attributionImg}
        alt="Yelp trademark"
        className="yelp-attribution"
      />
    </a>
  );
}

export default YelpAttribution;
