import React from 'react';
import Immutable from 'immutable';
import { getDetails } from '../../../api/detailApi';
import { getReviews } from '../../../api/reviewApi';
import { getBlogPosts, getBlogPostsCount } from '../../../api/blogPostApi';
import { details } from '../../../entity/details';
import { reviews } from '../../../entity/reviews';
import { Button } from '@blueprintjs/core';

import RoundBorderCard from '../../shared/RoundBorderCard/RoundBorderCard';
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
      blogPostsCount: 0,
      blogPostPage: 1,
      blogPostPageSize: 3,
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
    const params = {
      id: this.props.restaurantSelection.id,
      page: this.state.blogPostPage,
    };
    const blogPosts = await getBlogPosts(params);
    this.setState({ blogPosts });
  };

  getAndUpdateBlogPostsCount = async () => {
    const id = this.props.restaurantSelection.id;
    const blogPostsCount = await getBlogPostsCount(id);
    this.setState({ blogPostsCount });
  };

  handleBlogpostPagePrev = () => {
    const prevPage = this.state.blogPostPage - 1;
    if (prevPage < 1) {
      return;
    }
    this.setState(
      { blogPostPage: prevPage },
      async () => await this.getAndUpdateBlogPosts()
    );
  };

  handleBlogpostPageNext = () => {
    const capacity = this.state.blogPostPage * this.state.blogPostPageSize;
    if (capacity >= this.state.blogPostsCount) {
      return;
    }
    const nextPage = this.state.blogPostPage + 1;
    this.setState(
      { blogPostPage: nextPage },
      async () => await this.getAndUpdateBlogPosts()
    );
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

        <div className="container-wrapper">
          <RoundBorderCard className="summary-card" radius="10px">
            <RestaurantDetailSummary
              restaurant={this.props.restaurantSelection}
            />
          </RoundBorderCard>
        </div>

        <div className="container-wrapper">
          <RoundBorderCard className="details-card" radius="10px">
            <RestaurantDetailContent details={this.state.details} />
          </RoundBorderCard>
        </div>

        <div className="container-wrapper">
          <RoundBorderCard className="review-card" radius="10px">
            <RestaurantDetailReview reviews={this.state.reviews} />
          </RoundBorderCard>
        </div>

        <div className="container-wrapper">
          <RoundBorderCard className="blogpost-card" radius="10px">
            <RestaurantDetailBlogpost
              blogPosts={this.state.blogPosts}
              blogPostsCount={this.state.blogPostsCount}
              handleBlogpostPagePrev={this.handleBlogpostPagePrev}
              handleBlogpostPageNext={this.handleBlogpostPageNext}
            />
          </RoundBorderCard>
        </div>
      </div>
    );
  }
}

export default RestaurantDetailContainer;
