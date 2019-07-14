import React from 'react';
import { Button } from '@blueprintjs/core';
import { useFetchRestaurant } from '../../hooks/restaurantHooks';
import { useFetchDetails } from '../../hooks/detailHook';
import { useFetchBlogPosts } from '../../hooks/blogPostHook';
import { useReviews } from '../../hooks/reviewHook';

import RoundBorderCard from '../shared/RoundBorderCard/RoundBorderCard';
import RestaurantDetailSummary from './RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from './RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from './RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from './RestaurantDetailBlogpost/RestaurantDetailBlogpost';

import './RestaurantDetailContainer.css';

function RestaurantDetailContainer(props) {
  const id = props.restaurantSelection;

  const [restaurant, isRestaurantLoading] = useFetchRestaurant(id);
  const [details, isDetailsLoading] = useFetchDetails(id);
  const [blogPosts, isBlogPostsLoading] = useFetchBlogPosts(id);

  const [
    reviews,
    reviewSelected,
    setReviewSelected,
    isReviewsLoading,
  ] = useReviews(id);

  return (
    <div className="restaurant-detail-container">
      <div className="close-button-wrapper">
        <Button
          minimal
          icon="cross"
          onClick={props.clearRestaurantSelection}
          style={{ borderRadius: '20px' }}
        />
      </div>

      <div className="container-wrapper">
        <RoundBorderCard className="summary-card" radius="10px">
          <RestaurantDetailSummary restaurant={restaurant} />
        </RoundBorderCard>
      </div>

      <div className="container-wrapper">
        <RoundBorderCard className="details-card" radius="10px">
          <RestaurantDetailContent details={details} />
        </RoundBorderCard>
      </div>

      <div className="container-wrapper">
        <RoundBorderCard className="review-card" radius="10px">
          <RestaurantDetailReview
            reviews={reviews}
            reviewSelected={reviewSelected}
            updateReviewSelected={setReviewSelected}
          />
        </RoundBorderCard>
      </div>

      <div className="container-wrapper">
        <RoundBorderCard className="blogpost-card" radius="10px">
          <RestaurantDetailBlogpost blogPosts={blogPosts} />
        </RoundBorderCard>
      </div>
    </div>
  );
}

export default RestaurantDetailContainer;
