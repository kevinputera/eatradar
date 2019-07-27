import React from 'react';
import { usePaginatedContent } from '../../../hooks/paginationHooks';

import PaginationControls from '../../shared/PaginationControls/PaginationControls';

import './RestaurantDetailReview.css';

function RestaurantDetailReview(props) {
  const [offset, handleOffsetDecr, handleOffsetIncr] = usePaginatedContent(
    props.reviews.length
  );

  return props.isReviewsLoading ? (
    <div className="restaurant-detail-review detail-wrapper">
      <div className="restaurant-review-loading">Review loading...</div>
    </div>
  ) : (
    !!props.reviews.length && (
      <div className="restaurant-detail-review detail-wrapper">
        <div className="review-upper-row">
          <div className="review-identity">
            {props.reviews[offset].profile_photo_url && (
              <img
                className="review-profile-photo"
                src={props.reviews[offset].profile_photo_url}
                alt="Profile"
              />
            )}
            {props.reviews[offset].author_name && (
              <div className="review-author-name">
                {props.reviews[offset].author_name}
              </div>
            )}
          </div>
          {props.reviews[offset].rating &&
            props.starSupplier(props.reviews[offset].rating)}
        </div>
        {props.reviews[offset].text && (
          <div className="review-text">{props.reviews[offset].text}</div>
        )}
        <div className="review-lower-row">
          <div className="review-attribution">{props.attribution}</div>
          {props.reviews[offset].relative_time_description && (
            <div className="review-time">
              {props.reviews[offset].relative_time_description}
            </div>
          )}
        </div>
        <PaginationControls
          small
          offset={offset}
          handleOffsetDecr={handleOffsetDecr}
          handleOffsetIncr={handleOffsetIncr}
        />
      </div>
    )
  );
}

export default RestaurantDetailReview;
