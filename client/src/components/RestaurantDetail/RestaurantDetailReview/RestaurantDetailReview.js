import React from 'react';

import './RestaurantDetailReview.css';

function RestaurantDetailReview(props) {
  let rating;
  let reviews;
  if (props.reviews) {
    rating = props.reviews.rating;
    reviews = props.reviews.reviews;
  }

  let empty = false;
  if (!rating && !reviews) {
    empty = true;
  }

  return (
    <div className="restaurant-detail-review">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any rating nor reviews for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Ratings and reviews</div>
          <div className="review-rating">{rating}</div>
          <div className="review-reviews"></div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailReview;
