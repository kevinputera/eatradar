import React, { useMemo } from 'react';
import Rating from '../Rating/Rating';

import './GoogleRating.css';
import attributionImg from '../powered_by_google_on_white_hdpi.png';

function GoogleRating(props) {
  const stars = useMemo(() => {
    const five = '★★★★★';
    return (
      <>
        <div className="google-rating-stars-base">{five}</div>
        {props.rating && (
          <div
            className="google-rating-stars-overlay"
            style={{ width: `${props.rating * 20}%` }}
          >
            {five}
          </div>
        )}
      </>
    );
  }, [props.rating]);

  return (
    <div className="google-rating">
      <Rating
        attributionImg={attributionImg}
        attributionAlt="Powered by Google"
      >
        <div className="google-rating-stars">{stars}</div>
      </Rating>
    </div>
  );
}

export default GoogleRating;
