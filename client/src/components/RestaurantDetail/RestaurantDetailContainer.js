import React from 'react';
import Immutable from 'immutable';
import { getRestaurant } from '../../api/restaurantApi';
import { getDetails } from '../../api/detailApi';
import { getReviews } from '../../api/reviewApi';
import { getBlogPosts, getBlogPostsCount } from '../../api/blogPostApi';
import { details } from '../../entity/details';
import { reviews } from '../../entity/reviews';
import { restaurant } from '../../entity/restaurant';
import { Button } from '@blueprintjs/core';

import RoundBorderCard from '../shared/RoundBorderCard/RoundBorderCard';
import RestaurantDetailSummary from './RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from './RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from './RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from './RestaurantDetailBlogpost/RestaurantDetailBlogpost';

import './RestaurantDetailContainer.css';

class RestaurantDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: restaurant(),
      details: details(),
      reviews: reviews(),
      reviewsSelected: null,
      blogPosts: Immutable.List(),
      blogPostsCount: 0,
      blogPostPage: 1,
      blogPostPageSize: 3,
    };
  }

  componentDidMount() {
    this.getAndUpdateRestaurant();
    this.getAndUpdateDetails();
    this.getAndUpdateReviews();
    this.getAndUpdateBlogPosts();
    this.getAndUpdateBlogPostsCount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.restaurantSelection !== prevProps.restaurantSelection) {
      this.getAndUpdateRestaurant();
      this.getAndUpdateDetails();
      this.getAndUpdateReviews();
      this.getAndUpdateBlogPosts();
      this.getAndUpdateBlogPostsCount();
    }

    if (this.state.blogPostPage !== prevState.blogPostPage) {
      this.getAndUpdateBlogPosts();
    }
  }

  getAndUpdateRestaurant = async () => {
    const id = this.props.restaurantSelection;
    const restaurant = await getRestaurant(id);
    this.setState({ restaurant });
  };

  getAndUpdateDetails = async () => {
    const id = this.props.restaurantSelection;
    const details = await getDetails(id);
    this.setState({ details });
  };

  getAndUpdateReviews = async () => {
    const id = this.props.restaurantSelection;
    const reviews = await getReviews(id);
    this.setState({ reviews });
  };

  getAndUpdateBlogPosts = async () => {
    const params = {
      id: this.props.restaurantSelection,
      page: this.state.blogPostPage,
    };
    const blogPosts = await getBlogPosts(params);
    this.setState({ blogPosts });
  };

  getAndUpdateBlogPostsCount = async () => {
    const id = this.props.restaurantSelection;
    const blogPostsCount = await getBlogPostsCount(id);
    this.setState({ blogPostsCount });
  };

  handleBlogpostPagePrev = () => {
    const prevPage = this.state.blogPostPage - 1;
    if (prevPage < 1) {
      return;
    }
    this.setState({ blogPostPage: prevPage });
  };

  handleBlogpostPageNext = () => {
    const capacity = this.state.blogPostPage * this.state.blogPostPageSize;
    if (capacity >= this.state.blogPostsCount) {
      return;
    }
    const nextPage = this.state.blogPostPage + 1;
    this.setState({ blogPostPage: nextPage });
  };

  handleReviewSelect = brand => {
    this.setState({
      reviewsSelected: brand,
    });
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
            <RestaurantDetailSummary restaurant={this.state.restaurant} />
          </RoundBorderCard>
        </div>

        <div className="container-wrapper">
          <RoundBorderCard className="details-card" radius="10px">
            <RestaurantDetailContent details={this.state.details} />
          </RoundBorderCard>
        </div>

        <div className="container-wrapper">
          <RoundBorderCard className="review-card" radius="10px">
            <RestaurantDetailReview
              reviews={this.state.reviews}
              reviewsSelected={this.state.reviewsSelected}
              handleReviewSelect={this.handleReviewSelect}
            />
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
