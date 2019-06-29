import React from 'react';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import ExtendableContent from '../ExtendableContent/ExtendableContent';

import './RestaurantDetailBlogpost.css';

function RestaurantDetailBlogpost(props) {
  const blogposts = props.blogPosts.map(blogPost => (
    <ExtendableContent
      title={blogPost.title}
      body={blogPost.post}
      link={blogPost.link}
    />
  ));

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
          <div className="blogposts-wrapper">{blogposts}</div>
          <div className="detail-navigation">
            <NavigationButtons handlePagePrev={true} handlePageNext={true} />
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailBlogpost;
