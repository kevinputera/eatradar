import React from 'react';
import { getRestaurant } from '../../api/restaurantApi';
import { getDetails } from '../../api/detailApi';
import { getReviews } from '../../api/reviewApi';
import { getBlogPosts, getBlogPostsCount } from '../../api/blogPostApi';
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
      restaurant: null,
      details: null,
      reviews: null,
      reviewsSelected: null,
      blogPosts: [],
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
    try {
      const restaurant = await getRestaurant(id);
      this.setState({ restaurant });
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
  };

  getAndUpdateDetails = async () => {
    const id = this.props.restaurantSelection;
    try {
      const details = await getDetails(id);
      this.setState({ details });
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
  };

  getAndUpdateReviews = async () => {
    const id = this.props.restaurantSelection;
    try {
      const reviews = await getReviews(id);
      this.setState({ reviews });
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
  };

  getAndUpdateBlogPosts = async () => {
    const params = {
      id: this.props.restaurantSelection,
      page: this.state.blogPostPage,
    };
    try {
      const blogPosts = await getBlogPosts(params);
      this.setState({ blogPosts });
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
  };

  getAndUpdateBlogPostsCount = async () => {
    const id = this.props.restaurantSelection;
    try {
      const blogPostsCount = await getBlogPostsCount(id);
      this.setState({ blogPostsCount });
    } catch (e) {
      // TODO: status message
      console.log(e.stack);
    }
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
