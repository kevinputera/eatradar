import React from 'react';
import { Button } from '@blueprintjs/core';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  return (
    <div className="restaurant-detail-blogpost">
      {props.blogPostsCount <= 0 ? (
        <div className="detail-not-found">
          Sorry, we can't find any blog posts related to this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">
            Blog posts you might find interesting
          </div>
          <Button></Button> 
        </>
      )}
    </div>
  );
}

export default RestaurantDetailBlogpost;
