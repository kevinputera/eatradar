import React from 'react';
import { Classes } from '@blueprintjs/core';

import RestaurantDetailRating from '../RestaurantDetailRating/RestaurantDetailRating';
import GenericRatingStars from '../../shared/GenericRatingStars/GenericRatingStars';
import YelpRatingStars from '../../shared/YelpRatingStars/YelpRatingStars';
import GoogleAttribution from '../../shared/GoogleAttribution/GoogleAttribution';
import YelpAttribution from '../../shared/YelpAttribution/YelpAttribution';

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
        <>
          <div
            className={
              'restaurant-detail-rating-loading ' + Classes.SKELETON
            }
          >
            &nbsp;
          </div>
          <div
            className={
              'restaurant-detail-rating-loading ' + Classes.SKELETON
            }
          >
            &nbsp;
          </div>
        </>
      ) : (
        <>
          {props.ratings.google && (
            <div className="restaurant-detail-rating">
              <RestaurantDetailRating
                stars={
                  <GenericRatingStars
                    large
                    rating={props.ratings.google}
                  />
                }
                attribution={<GoogleAttribution />}
              />
            </div>
          )}
          {props.ratings.yelp && (
            <div className="restaurant-detail-rating">
              <RestaurantDetailRating
                stars={
                  <YelpRatingStars large rating={props.ratings.yelp} />
                }
                attribution={<YelpAttribution />}
              />
            </div>
          )}
          {noRatings && (
            <div className="ratings-not-found">No ratings</div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantDetailSummary;
