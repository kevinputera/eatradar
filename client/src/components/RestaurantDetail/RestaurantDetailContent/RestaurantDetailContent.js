import React from 'react';
import LogoFieldContent from '../../shared/LogoFieldContent/LogoFieldContent';
import { capitalize } from '../../../utils/stringUtils';
// import CircularOpeningIndicator from '../../shared/CircularOpeningIndicator/CircularOpeningIndicator';

import './RestaurantDetailContent.css';

function RestaurantDetailContent(props) {
  const today = new Date().getDay();
  return (
    <div className="restaurant-detail-content">
      {props.isRestaurantLoading ? (
        <div className="restaurant-address-loading">
          Address loading...
        </div>
      ) : (
        <div className="restaurant-address">
          <LogoFieldContent icon="map-marker">
            {props.restaurant.block ? `${props.restaurant.block} ` : ''}
            {capitalize(props.restaurant.street)}
            {props.restaurant.level ? ` #${props.restaurant.level}` : ''}
            {props.restaurant.unit
              ? props.restaurant.level
                ? `-${props.restaurant.unit}`
                : ` #${props.restaurant.unit}`
              : ''}
            {props.restaurant.postcode
              ? ` ${props.restaurant.postcode}`
              : ''}
          </LogoFieldContent>
        </div>
      )}
      {props.isDetailsLoading ? (
        <div className="restaurant-detail-loading">Details loading...</div>
      ) : (
        <div className="restaurant-detail-phone">
          {props.details && props.details.phone && (
            <LogoFieldContent icon="phone">
              {props.details.phone}
            </LogoFieldContent>
          )}
          {props.details && props.details.website && (
            <LogoFieldContent icon="globe-network">
              <a
                href={props.details.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.details.website}
              </a>
            </LogoFieldContent>
          )}
          {props.details && props.details.opening_hours && (
            <LogoFieldContent icon="time">
              {props.details.opening_hours.periods[today].open.time} -{' '}
              {props.details.opening_hours.periods[today].close.time}
            </LogoFieldContent>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantDetailContent;
