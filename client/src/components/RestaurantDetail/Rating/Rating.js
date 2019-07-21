import React from 'react';

import './Rating.css';

function Rating(props) {
  return (
    <div className="rating">
      <div className="rating-content">{props.children}</div>
      <img
        className="rating-attribution"
        src={props.attributionImg}
        alt={props.attributionAlt}
      />
    </div>
  );
}

export default Rating;
