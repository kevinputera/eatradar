import React from 'react';
import GoogleRating from '../GoogleRating/GoogleRating';

import './RestaurantDetailSummary.css';

function RestaurantDetailSummary(props) {
  const noRatings = !props.ratings.google && !props.ratings.yelp;
  return (
    <div className="restaurant-detail-summary">
      {props.isRestaurantLoading ? (
        <div className="restaurant-detail-name-loading">
          Loading name...
        </div>
      ) : (
        <div className="restaurant-detail-name">
          {props.restaurant.name}
        </div>
      )}
      {props.isReviewsLoading ? (
        <div className="restaurant-detail-ratings-loading">
          Loading reviews...
        </div>
      ) : (
        <div className="restaurant-detail-ratings">
          {props.ratings.google && (
            <div className="restaurant-google-rating-wrapper">
              <GoogleRating rating={props.ratings.google} />
            </div>
          )}
          {props.ratings.yelp && (
            <div className="restaurant-yelp-rating-wrapper"></div>
          )}
          {noRatings && (
            <div className="ratings-not-found">No ratings</div>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantDetailSummary;
