import React from 'react';
import { Button, H5 } from '@blueprintjs/core';

import RestaurantDetailCard from '../RestaurantDetailCard/RestaurantDetailCard';

import './RestaurantDetailContainer.css';

class RestaurantDetailContainer extends React.Component {
  render() {
    const restaurant = this.props.restaurantSelection;
    return (
      <div className="restaurant-detail-container">
        <div className="close-button-wrapper">
          <Button
            minimal
            icon="cross"
            onClick={this.props.clearRestaurantSelection}
            style={{ borderRadius: '20px' }}
          />
        </div>
        <RestaurantDetailCard className="summary-card">
          <H5>{restaurant ? restaurant.name : null}</H5>
        </RestaurantDetailCard>
        <RestaurantDetailCard className="details-card">
        </RestaurantDetailCard>
        <RestaurantDetailCard className="review-card">
        </RestaurantDetailCard>
        <RestaurantDetailCard className="blogpost-card">
        </RestaurantDetailCard>
      </div>
    );
  }
}

export default RestaurantDetailContainer;