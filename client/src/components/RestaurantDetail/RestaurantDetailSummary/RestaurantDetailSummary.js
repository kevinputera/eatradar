import React from 'react';
import { Classes } from '@blueprintjs/core';
import RestaurantDetailRatingGoogle from '../RestaurantDetailRatingGoogle/RestaurantDetailRatingGoogle';

import './RestaurantDetailSummary.css';

function RestaurantDetailSummary(props) {
  const noRatings = !props.ratings.google && !props.ratings.yelp;
  return (
    <div className="restaurant-detail-summary">
      {props.isRestaurantLoading ? (
        <div
          className={'restaurant-detail-name-loading ' + Classes.SKELETON}
        >
          &nbsp;
        </div>
      ) : (
        <div className="restaurant-detail-name">
          {props.restaurant.name}
        </div>
      )}
      {props.isRatingsLoading ? (
        <div
          className={
            'restaurant-detail-ratings-loading ' + Classes.SKELETON
          }
        >
          &nbsp;
        </div>
      ) : (
        <div className="restaurant-detail-ratings">
          {props.ratings.google && (
            <div className="restaurant-google-rating-wrapper">
              <RestaurantDetailRatingGoogle
                rating={props.ratings.google}
              />
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
