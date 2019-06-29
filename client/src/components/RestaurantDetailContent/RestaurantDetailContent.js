import React from 'react';

import './RestaurantDetailContent.css';

function RestaurantDetailContent(props) {
  let phone;
  let website;
  if (props.details) {
    phone = props.details.phone_number;
    website = props.details.website;
    // hours = props.details.opening_hours;
    // photos = props.details.photos;
  }

  let empty = false;
  if (!phone && !website) {
    empty = true;
  }

  return (
    <div className="restaurant-detail-content">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any details for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Details</div>
          <div className="detail-phone-number">{phone}</div>
          <div className="detail-website">{website}</div>
          <div className="detail-opening-hours"></div>
          <div className="detail-photos"></div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailContent;
