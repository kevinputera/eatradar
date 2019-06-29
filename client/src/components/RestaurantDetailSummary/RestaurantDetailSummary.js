import React from 'react';
import { getDistanceString } from '../../utils/conversion';

import './RestaurantDetailSummary.css';

function RestaurantDetailSummary(props) {
  let summary;
  if (props.restaurant) {
    summary = (
      <div className="restaurant-detail-summary">
        <section className="restaurant-detail-identity">
          <div className="restaurant-detail-name">{props.restaurant.name}</div>
          <div className="restaurant-detail-address">
            <span>{props.restaurant.block} </span>
            <span>{props.restaurant.street}</span>
          </div>
          <div className="restaurant-detail-address">
            {props.restaurant.level && props.restaurant.unit ? (
              <>
                <span>#{props.restaurant.level}-</span>
                <span>{props.restaurant.unit}, </span>
              </>
            ) : null}
            <span>{props.restaurant.postcode}</span>
          </div>
        </section>
        <div className="restaurant-detail-distance-wrapper">
          <div className="restaurant-detail-distance">
            {getDistanceString(props.restaurant.dist)}
          </div>
          <div className="restaurant-detail-distance-text">away</div>
        </div>
      </div>
    );
  }

  return summary;
}

export default RestaurantDetailSummary;
