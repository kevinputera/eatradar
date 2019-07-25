import React from 'react';

import './RestaurantDetailRating.css';

function RestaurantDetailRating(props) {
  return (
    <div className="rating">
      <div className="rating-content">{props.children}</div>
      <div className="rating-attribution">{props.attribution}</div>
    </div>
  );
}

export default RestaurantDetailRating;
