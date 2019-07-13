import React from 'react';
import { Collapse } from '@blueprintjs/core';
import FieldContent from '../../shared/FieldContent/FieldContent';
import ExtendableContent from '../../shared/ExtendableContent/ExtendableContent';
import RoundBorderCard from '../../shared/RoundBorderCard/RoundBorderCard';

import './RestaurantDetailReview.css';
import poweredByGoogle from '../powered_by_google_on_white_hdpi.png';

function RestaurantDetailReview(props) {
  function handleRatingClick(brand) {
    if (props.reviewsSelected === brand) {
      props.handleReviewSelect(null);
    } else {
      props.handleReviewSelect(brand);
    }
  }

  const empty = !props.reviews || !props.reviews.google;

  return (
    <div className="restaurant-detail-review">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any rating nor reviews for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Ratings and reviews</div>
          <div className="reviews-content">
            <FieldContent
              body={props.reviews.google.rating}
              attribution={poweredByGoogle}
              attributionAlt="Powered by Google"
              onClick={() => handleRatingClick('google')}
            />
            <Collapse isOpen={props.reviewsSelected === 'google'}>
              <div className="reviews-content-body-wrapper">
                <RoundBorderCard radius="5px" padding="12px 10px">
                  <div className="reviews-content-body">
                    {props.reviews.google.reviews &&
                      props.reviews.google.reviews
                        .filter(review => review.text)
                        .slice(0, 2)
                        .map(review => (
                          <ExtendableContent
                            extendable
                            key={review.author_name}
                            content={review.text}
                            count={20}
                            footer={review.author_name}
                          />
                        ))}
                  </div>
                </RoundBorderCard>
              </div>
            </Collapse>
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailReview;
