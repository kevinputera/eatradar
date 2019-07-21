import React from 'react';
import Carousel from '../../shared/Carousel/Carousel';
import { getSummary } from '../../../utils/stringUtils';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  return (
    <div className="restaurant-detail-blogpost">
      {props.blogPosts && !!props.blogPosts.length && (
        <Carousel
          contents={props.blogPosts.map(blogPost => ({
            ...blogPost,
            post: getSummary(blogPost.post, 50),
          }))}
        />
      )}
    </div>
  );
}

export default RestaurantDetailBlogpost;
