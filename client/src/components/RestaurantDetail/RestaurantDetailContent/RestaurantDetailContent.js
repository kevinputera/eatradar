import React from 'react';
import { capitalize } from '../../../utils/stringUtils';

import {
  LogoFieldContent,
  LogoFieldContentLoading,
} from '../../shared/LogoFieldContent/LogoFieldContent';

import './RestaurantDetailContent.css';

function RestaurantDetailContent(props) {
  const today = new Date().getDay();
  return (
    <div className="restaurant-detail-content">
      {props.isLoading ? (
        <>
          <LogoFieldContentLoading />
          <LogoFieldContentLoading />
          <LogoFieldContentLoading />
          <LogoFieldContentLoading />
        </>
      ) : (
        <>
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
          {props.details.phone && (
            <LogoFieldContent icon="phone">
              {props.details.phone}
            </LogoFieldContent>
          )}
          {props.details.website && (
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
          {props.details.opening_hours &&
            today < props.details.opening_hours.length && (
              <LogoFieldContent icon="time">
                {props.details.opening_hours.periods[today].open.time} -{' '}
                {props.details.opening_hours.periods[today].close.time}
              </LogoFieldContent>
            )}
        </>
      )}
    </div>
  );
}

export default RestaurantDetailContent;
