import React from 'react';
import { getDetails } from '../../api/detailApi';
import { Button } from '@blueprintjs/core';

import RestaurantDetailCard from '../RestaurantDetailCard/RestaurantDetailCard';
import RestaurantDetailSummary from '../RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from '../RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from '../RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from '../RestaurantDetailBlogpost/RestaurantDetailBlogpost';

import './RestaurantDetailContainer.css';

class RestaurantDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // details
      details: null,

      // reviews
    };
  }

  async componentDidMount() {
    await this.getAndUpdateDetails();
  }

  getAndUpdateDetails = async () => {
    const id = this.props.restaurantSelection.id;
    const details = await getDetails(id);
    this.setState({ details: details });
  }

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
            details={this.state.details}
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