import React from 'react';
import FieldContent from '../../shared/FieldContent/FieldContent';
// import CircularOpeningIndicator from '../../shared/CircularOpeningIndicator/CircularOpeningIndicator';

import './RestaurantDetailContent.css';
import poweredByGoogle from '../powered_by_google_on_white_hdpi.png';

function RestaurantDetailContent(props) {
  let phone;
  let website;
  let hours;
  if (props.details) {
    phone = props.details.phone_number && (
      <FieldContent
        title="Phone number"
        body={props.details.phone_number}
      />
    );

    website = props.details.website && (
      <FieldContent
        title="Website"
        body={
          <a
            href={props.details.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.details.website}
          </a>
        }
      />
    );

    const day = new Date().getDay();
    hours = props.details.opening_hours &&
      day < props.details.opening_hours.length && (
        <FieldContent
          title="Opening hours"
          body={`${props.details.opening_hours.periods[day].open.time} 
          - ${props.details.opening_hours.periods[day].close.time}`}
        />
      );
  }

  const empty = !phone && !website && !hours;

  return (
    <div className="restaurant-detail-content">
      {empty ? (
        <div className="detail-not-found">
          Sorry, we can't find any details for this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">Details</div>
          <div className="contents-wrapper">
            {phone}
            {website}
            {hours}
            <div className="detail-photos"></div>
          </div>
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
