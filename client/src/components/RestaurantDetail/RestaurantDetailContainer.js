import React from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useFetchRestaurant } from '../../hooks/restaurantHooks';
import { useFetchDetails } from '../../hooks/detailHooks';
import { useFetchBlogPosts } from '../../hooks/blogPostHooks';
import { useReviews } from '../../hooks/reviewHooks';

import RestaurantDetailSummary from './RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from './RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from './RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from './RestaurantDetailBlogpost/RestaurantDetailBlogpost';
import GoogleAttribution from '../shared/GoogleAttribution/GoogleAttribution';

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
      <div className="detail-wrapper">
        <RestaurantDetailSummary
          isRestaurantLoading={isRestaurantLoading}
          isReviewsLoading={isReviewsLoading}
          restaurant={restaurant}
          ratings={ratings}
        />
      </div>
      <Divider />
      <div className="detail-wrapper">
        <RestaurantDetailContent
          isRestaurantLoading={isRestaurantLoading}
          isDetailsLoading={isDetailsLoading}
          restaurant={restaurant}
          details={details}
        />
      </div>
      {(isReviewsLoading || reviews.google) && <Divider />}
      <div className="detail-wrapper">
        <RestaurantDetailReview
          isReviewsLoading={isReviewsLoading}
          reviews={reviews.google}
          attribution={<GoogleAttribution />}
        />
      </div>
      {(isBlogPostsLoading || !!blogPosts.length) && <Divider />}
      <div className="detail-wrapper">
        <RestaurantDetailBlogpost
          isBlogPostsLoading={isBlogPostsLoading}
          blogPosts={blogPosts}
        />
      </div>
    </div>
  );
}

export default RestaurantDetailContainer;
