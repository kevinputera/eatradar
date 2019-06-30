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

  let gr;
  const google = props.reviews.google;
  if (google) {
    const reviews = google.reviews
      .filter(review => review.text)
      .take(2)
      .map(review => (
        <ExtendableContent
          extendable
          key={review.author_name}
          body={review.text}
          count={20}
          footer={review.author_name}
        />
      ));

    gr = (
      <>
        <FieldContent
          body={google.rating}
          attribution={poweredByGoogle}
          attributionAlt="Powered by Google"
          onClick={() => handleRatingClick('google')}
        />
        <Collapse isOpen={props.reviewsSelected === 'google'}>
          <div className="reviews-content-body-wrapper">
            <RoundBorderCard radius="5px" padding="12px 10px">
              <div className="reviews-content-body">{reviews}</div>
            </RoundBorderCard>
          </div>
        </Collapse>
      </>
    );
  }

  const empty = !gr;

  return (
    <div className="restaurant-detail-review">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any rating nor reviews for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Ratings and reviews</div>
          <div className="reviews-content">{gr}</div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailReview;
