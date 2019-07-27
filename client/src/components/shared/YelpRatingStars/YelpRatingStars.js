import React from 'react';

import ZERO from './large_0.png';
import ONE from './large_1.png';
import ONE_HALF from './large_1_half.png';
import TWO from './large_2.png';
import TWO_HALF from './large_2_half.png';
import THREE from './large_3.png';
import THREE_HALF from './large_3_half.png';
import FOUR from './large_4.png';
import FOUR_HALF from './large_4_half.png';
import FIVE from './large_5.png';

function getStars(rating) {
  if (!rating || rating < 0.5) {
    return ZERO;
  }
  if (rating < 1.25) {
    return ONE;
  }
  if (rating < 1.75) {
    return ONE_HALF;
  }
  if (rating < 2.25) {
    return TWO;
  }
  if (rating < 2.75) {
    return TWO_HALF;
  }
  if (rating < 3.25) {
    return THREE;
  }
  if (rating < 3.75) {
    return THREE_HALF;
  }
  if (rating < 4.25) {
    return FOUR;
  }
  if (rating < 4.75) {
    return FOUR_HALF;
  }
  return FIVE;
}

function YelpRatingStars(props) {
  const stars = getStars(props.rating);
  return (
    <div className="yelp-rating-stars">
      <img
        src={stars}
        width={props.large ? '91px' : '77px'}
        alt="Yelp star rating"
      />
    </div>
  );
}

export default YelpRatingStars;
