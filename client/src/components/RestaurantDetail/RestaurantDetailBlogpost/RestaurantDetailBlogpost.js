import React from 'react';
import Carousel from '../../shared/Carousel/Carousel';
import { getSummary } from '../../../utils/stringUtils';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  return props.isBlogPostsLoading ? (
    <div className="restaurant-detail-blogpost">
      <div className="restaurant-blogpost-loading">
        Blog posts loading...
      </div>
    </div>
  ) : (
    !!props.blogPosts.length && (
      <div className="restaurant-detail-blogpost">
        <Carousel
          contents={props.blogPosts.map(blogPost => ({
            ...blogPost,
            post: getSummary(blogPost.post, 50),
          }))}
        />
      </div>
    )
  );
}

export default RestaurantDetailBlogpost;
