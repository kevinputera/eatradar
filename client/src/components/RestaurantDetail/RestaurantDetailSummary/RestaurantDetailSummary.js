import React from 'react';

import './RestaurantDetailSummary.css';

function RestaurantDetailSummary(props) {
  let summary;
  if (props.restaurant) {
    summary = (
      <section className="restaurant-detail-summary">
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
    );
  }

  return summary;
}

export default RestaurantDetailSummary;
