import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import NavigationButtons from '../NavigationButtons/NavigationButtons';

import './RestaurantDetailBlogpost.css';

function Blogpost(props) {
  return (
    <div className="blogpost">
      <Card elevation={Elevation.ONE}>
        <div className="blogpost-content blogpost-title">
          <strong>{props.title}</strong>
        </div>
        <div className="blogpost-content blogpost-body">
          {props.body}
        </div>
        <div className="blogpost-content blogpost-link">
          {props.link}
        </div>
      </Card>
    </div>
  )
}

function RestaurantDetailBlogpost(props) {
  const blogposts = props.blogPosts.map(blogPost => 
    <Blogpost 
      title={blogPost.title}
      body={blogPost.post}
      link={blogPost.link}
    />
  );

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
          <div className="blogposts-wrapper">
            {blogposts}
          </div>
          <div className="detail-navigation">
            <NavigationButtons 
              handlePagePrev={true} 
              handlePageNext={true}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailBlogpost;
