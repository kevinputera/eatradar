import React from 'react';
import ExtendableContent from '../../shared/ExtendableContent/ExtendableContent';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  return (
    <div className="restaurant-detail-blogpost">
      {!props.blogPosts || !props.blogPosts.length ? (
        <div className="detail-not-found">
          Sorry, we can't find any blog posts related to this restaurant
        </div>
      ) : (
        <>
          <div className="detail-header">
            Blog posts you might find interesting
          </div>
          <div className="blogposts-wrapper">
            {props.blogPosts.map(blogPost => (
              <ExtendableContent
                extendable
                key={blogPost.id}
                title={blogPost.title}
                content={blogPost.post}
                count={20}
                link={blogPost.link}
                footer={blogPost.author}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailBlogpost;
