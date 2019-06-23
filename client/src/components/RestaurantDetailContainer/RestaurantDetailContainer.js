import React from 'react';
import { Button } from '@blueprintjs/core';

import RestaurantDetailCard from '../RestaurantDetailCard/RestaurantDetailCard';
import RestaurantDetailSummary from '../RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from '../RestaurantDetailContent/RestaurantDetailContent';

import './RestaurantDetailContainer.css';
import RestaurantDetailReview from '../RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from '../RestaurantDetailBlogpost/RestaurantDetailBlogpost';

class RestaurantDetailContainer extends React.Component {
  render() {
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
          <RestaurantDetailSummary 
            restaurant={this.props.restaurantSelection}
          />
        </RestaurantDetailCard>

        <RestaurantDetailCard className="details-card">
          <RestaurantDetailContent
            id={this.props.restaurantSelection.id}
          />
        </RestaurantDetailCard>

        <RestaurantDetailCard className="review-card">
          <RestaurantDetailReview 
            id={this.props.restaurantSelection.id}
          />
        </RestaurantDetailCard>

        <RestaurantDetailCard className="blogpost-card">
          <RestaurantDetailBlogpost
            id={this.props.restaurantSelection.id}
          />
        </RestaurantDetailCard>
      </div>
    );
  }
}

export default RestaurantDetailContainer;