import React, { Fragment } from 'react';
import { getDistanceString } from '../../utils/conversion';

import './RestaurantDetailSummary.css';

function RestaurantDetailSummary(props) {
  let summary;
  if (props.restaurant) {
    summary = (
      <div className="restaurant-detail-summary">
        <section className="restaurant-detail-identity">
          <div className="restaurant-detail-name">
            {props.restaurant.name}
          </div>
          <div className="restaurant-detail-address">
            <span>{props.restaurant.block} </span>
            <span>{props.restaurant.street}</span>
          </div>
          <div className="restaurant-detail-address">
            {props.restaurant.level && props.restaurant.unit
              ? <Fragment> 
                  <span>#{props.restaurant.level}-</span>
                  <span>{props.restaurant.unit}, </span>
                </Fragment>
              : null}
            <span>{props.restaurant.postcode}</span>
          </div>
        </section>
        <div className="restaurant-detail-distance-wrapper">
          <div className="restaurant-detail-distance">
            {getDistanceString(props.restaurant.dist)}
          </div>
          <div className="restaurant-detail-distance-text">
            away
          </div>
        </div>
      </div>
    );
  }
  console.log(props.restaurant);

  return summary;
}

export default RestaurantDetailSummary;
