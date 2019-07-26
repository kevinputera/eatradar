import React from 'react';

import RestaurantDetailRating from '../RestaurantDetailRating/RestaurantDetailRating';
import GenericRatingStars from '../../shared/GenericRatingStars/GenericRatingStars';
import GoogleAttribution from '../../shared/GoogleAttribution/GoogleAttribution';

import './RestaurantDetailRatingGoogle.css';

function RestaurantDetailRatingGoogle(props) {
  return (
    <div className="google-rating">
      <RestaurantDetailRating attribution={<GoogleAttribution large />}>
        <GenericRatingStars large rating={props.rating} />
      </RestaurantDetailRating>
    </div>
  );
}

export default RestaurantDetailRatingGoogle;
