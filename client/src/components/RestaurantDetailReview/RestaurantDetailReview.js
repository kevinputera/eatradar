import React, { Fragment } from 'react';

import './RestaurantDetailReview.css';

function RestaurantDetailReview(props) {
  let rating;
  let reviews;
  if (props.reviews) {
    rating = props.reviews.rating;
    reviews = props.reviews.reviews;
  }
  const content = (
    <Fragment>
      <div className="review-rating">{rating}</div>
      <div className="review-reviews"></div>
    </Fragment>
  );

  let empty = false;
  if (!rating && !reviews) {
    empty = true;
  }

  return (
    <div className="restaurant-detail-review">
      {!empty
        ? content
        : `Sorry, we can't find any rating nor reviews for this restaurant`}
    </div>
  );
}

export default RestaurantDetailReview;
