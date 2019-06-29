import React from 'react';
import Immutable from 'immutable';
import { getDetails } from '../../api/detailApi';
import { getReviews } from '../../api/reviewApi';
import { getBlogPosts, getBlogPostsCount } from '../../api/blogPostApi';
import { details } from '../../entity/details';
import { reviews } from '../../entity/reviews';
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
      details: details(),
      reviews: reviews(),
      blogPosts: Immutable.List(),
      blogPostsCount: -1,
    };
  }

  getAndUpdateDetails = async () => {
    const id = this.props.restaurantSelection.id;
    const details = await getDetails(id);
    this.setState({ details });
  };

  getAndUpdateReviews = async () => {
    const id = this.props.restaurantSelection.id;
    const reviews = await getReviews(id);
    this.setState({ reviews });
  };

  getAndUpdateBlogPosts = async () => {
    // TODO: Add page and pageSize
    const params = {
      id: this.props.restaurantSelection.id,
    };
    const blogPosts = await getBlogPosts(params);
    this.setState({ blogPosts });
  };

  getAndUpdateBlogPostsCount = async () => {
    const id = this.props.restaurantSelection.id;
    const blogPostsCount = await getBlogPostsCount(id);
    this.setState({ blogPostsCount });
  };

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
          <RestaurantDetailContent details={this.state.details} />
        </RestaurantDetailCard>

        <RestaurantDetailCard className="review-card">
          <RestaurantDetailReview reviews={this.state.reviews} />
        </RestaurantDetailCard>

        <RestaurantDetailCard className="blogpost-card">
          <RestaurantDetailBlogpost
            blogPosts={this.state.blogPosts}
            blogPostsCount={this.state.blogPostsCount}
          />
        </RestaurantDetailCard>
      </div>
    );
  }
}

export default RestaurantDetailContainer;
