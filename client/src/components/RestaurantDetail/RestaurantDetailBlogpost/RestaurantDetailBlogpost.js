import React from 'react';
import { Icon } from '@blueprintjs/core';
import Carousel from '../../shared/Carousel/Carousel';
import { getSummary } from '../../../utils/stringUtils';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  return (
    props.blogPosts &&
    !!props.blogPosts.length && (
      <div className="restaurant-detail-blogpost">
        <div className="restaurant-detail-blogpost-title">
          <Icon className="blogpost-icon" icon="align-left" />
          Blog posts you might be interested in
        </div>
        <div className="restaurant-detail-blogpost-content">
          <Carousel
            contents={props.blogPosts.map(blogPost => ({
              ...blogPost,
              post: getSummary(blogPost.post, 50),
            }))}
          />
        </div>
      </div>
    )
  );
}

export default RestaurantDetailBlogpost;
