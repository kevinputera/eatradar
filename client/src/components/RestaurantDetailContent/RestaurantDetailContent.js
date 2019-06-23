import React, { Fragment } from 'react';

import './RestaurantDetailContent.css';

function RestaurantDetailContent(props) {
  let phone;
  let website;
  let hours;
  let photos;
  if (props.details) {
    phone = props.details.phone_number;
    website = props.details.website;
    hours = props.details.opening_hours;
    photos = props.details.photos;
  }
  const content = (
    <Fragment>
      <div className="detail-phone-number">
        {phone}
      </div>
      <div className="detail-website">
        {website}
      </div>
      <div className="detail-opening-hours">
      </div>
      <div className="detail-photos">
      </div>
    </Fragment>
  );

  let empty = false;
  if (!phone && !website && !hours && !photos) {
    empty = true;
  }

  return (
    <div className="restaurant-detail-content">
      {!empty ? content : 'Sorry, we can\'t find details for this restaurant'}
    </div>
  );
}

export default RestaurantDetailContent;
