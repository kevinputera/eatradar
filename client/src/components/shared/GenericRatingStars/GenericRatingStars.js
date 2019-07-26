import React from 'react';

import './GenericRatingStars.css';

const full = '★★★★★';

function GenericRatingStars(props) {
  return (
    <div
      className="generic-rating-stars"
      style={{ fontSize: props.large ? '1.3em' : '1.1em' }}
    >
      <div className="generic-stars-base">{full}</div>
      {props.rating && (
        <div
          className="generic-stars-overlay"
          style={{ width: `${props.rating * 20}%` }}
        >
          {full}
        </div>
      )}
    </div>
  );
}

export default GenericRatingStars;
