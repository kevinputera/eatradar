import React from 'react';
import FieldContent from '../../shared/FieldContent/FieldContent';
// import CircularOpeningIndicator from '../../shared/CircularOpeningIndicator/CircularOpeningIndicator';

import './RestaurantDetailContent.css';
import poweredByGoogle from './powered_by_google_on_white_hdpi.png';

function RestaurantDetailContent(props) {
  let phone;
  let website;
  let hours;
  if (props.details) {
    phone = props.details.phone_number;
    website = props.details.website;
    hours = props.details.opening_hours;
    // photos = props.details.photos;
  }

  let empty = false;
  if (!phone && !website && !hours) {
    empty = true;
  }

  const day = new Date().getDay();

  return (
    <div className="restaurant-detail-content">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any details for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Details</div>
          {phone && <FieldContent title="Phone number" body={phone} />}
          {website && (
            <FieldContent
              title="Website"
              body={
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              }
            />
          )}
          {hours && (
            <FieldContent
              title="Opening hours"
              body={`${hours.periods.get(day).open.time} - ${
                hours.periods.get(day).close.time
              }`}
            />
          )}
          <div className="detail-photos"></div>
          <div className="attribution-wrapper">
            <img
              className="attribution"
              src={poweredByGoogle}
              alt="Powered by Google"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailContent;
