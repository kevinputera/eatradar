import React, { useCallback } from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useFetchRestaurant } from '../../hooks/restaurantHooks';
import { useFetchDetails } from '../../hooks/detailHooks';
import { useFetchBlogPosts } from '../../hooks/blogPostHooks';
import { useFetchRatingReviews } from '../../hooks/ratingReviewHooks';

import RestaurantDetailSummary from './RestaurantDetailSummary/RestaurantDetailSummary';
import RestaurantDetailContent from './RestaurantDetailContent/RestaurantDetailContent';
import RestaurantDetailReview from './RestaurantDetailReview/RestaurantDetailReview';
import RestaurantDetailBlogpost from './RestaurantDetailBlogpost/RestaurantDetailBlogpost';
import GenericRatingStars from '../shared/GenericRatingStars/GenericRatingStars';
import YelpRatingStars from '../shared/YelpRatingStars/YelpRatingStars';
import GoogleAttribution from '../shared/GoogleAttribution/GoogleAttribution';
import YelpAttribution from '../shared/YelpAttribution/YelpAttribution';

import './RestaurantDetailContainer.css';

function RestaurantDetailContainer(props) {
  const id = props.restaurantIdSelection;

  const [restaurant, isRestaurantLoading] = useFetchRestaurant(id);
  const [details, isDetailsLoading] = useFetchDetails(id);
  const [blogPosts, isBlogPostsLoading] = useFetchBlogPosts(id);

  const [ratings, reviews, isRatingReviewsLoading] = useFetchRatingReviews(id);

  const googleStarSupplier = useCallback(
    rating => <GenericRatingStars rating={rating} />,
    []
  );
  const yelpStarSupplier = useCallback(
    rating => <YelpRatingStars rating={rating} />,
    []
  );

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
      <RestaurantDetailSummary
        isRestaurantLoading={isRestaurantLoading}
        isRatingsLoading={isRatingReviewsLoading}
        restaurant={restaurant}
        ratings={ratings}
      />
      <Divider />
      <RestaurantDetailContent
        isLoading={isRestaurantLoading || isDetailsLoading}
        restaurant={restaurant}
        details={details}
      />
      {(isRatingReviewsLoading || !!reviews.google.length) && <Divider />}
      <RestaurantDetailReview
        isReviewsLoading={isRatingReviewsLoading}
        starSupplier={googleStarSupplier}
        reviews={reviews.google}
        attribution={<GoogleAttribution />}
      />
      {(isRatingReviewsLoading || !!reviews.yelp.length) && <Divider />}
      <RestaurantDetailReview
        isReviewsLoading={isRatingReviewsLoading}
        starSupplier={yelpStarSupplier}
        reviews={reviews.yelp}
        attribution={<YelpAttribution />}
      />
      {(isBlogPostsLoading || !!blogPosts.length) && <Divider />}
      <RestaurantDetailBlogpost
        isBlogPostsLoading={isBlogPostsLoading}
        blogPosts={blogPosts}
      />
    </div>
  );
}

export default RestaurantDetailContainer;
