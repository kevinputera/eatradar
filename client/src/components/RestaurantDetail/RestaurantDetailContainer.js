import React from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useFetchRestaurant } from '../../hooks/restaurantHooks';
import { useFetchDetails } from '../../hooks/detailHook';
import { useFetchBlogPosts } from '../../hooks/blogPostHook';
import { useReviews } from '../../hooks/reviewHook';

import RestaurantDetailSummary from './RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from './RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from './RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from './RestaurantDetailBlogpost/RestaurantDetailBlogpost';

import './RestaurantDetailContainer.css';

function RestaurantDetailContainer(props) {
  const id = props.restaurantIdSelection;

  const [restaurant, isRestaurantLoading] = useFetchRestaurant(id);
  const [details, isDetailsLoading] = useFetchDetails(id);
  const [blogPosts, isBlogPostsLoading] = useFetchBlogPosts(id);

  const [ratings, reviews, isReviewsLoading] = useReviews(id);

  return (
    <div className="restaurant-detail-container">
      <div className="close-button-wrapper">
        <Button
          minimal
          icon="cross"
          onClick={props.clearRestaurantIdSelection}
          style={{ borderRadius: '20px' }}
        />
      </div>
      <div className="container-wrapper">
        <RestaurantDetailSummary
          isRestaurantLoading={isRestaurantLoading}
          isReviewsLoading={isReviewsLoading}
          restaurant={restaurant}
          ratings={ratings}
        />
      </div>
      <Divider />
      <div className="container-wrapper">
        <RestaurantDetailContent
          isRestaurantLoading={isRestaurantLoading}
          isDetailsLoading={isDetailsLoading}
          restaurant={restaurant}
          details={details}
        />
      </div>
      <Divider />
      <div className="container-wrapper">
        <RestaurantDetailBlogpost blogPosts={blogPosts} />
      </div>
      <div className="container-wrapper">
        <RestaurantDetailReview
          reviews={reviews}
          reviewSelected={() => {}}
          updateReviewSelected={() => {}}
        />
      </div>
    </div>
  );
}

export default RestaurantDetailContainer;
