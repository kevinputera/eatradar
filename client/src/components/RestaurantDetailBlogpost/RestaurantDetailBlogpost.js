import React from 'react';

import './RestaurantDetailBlogpost.css';

class RestaurantDetailBlogpost extends React.Component {
  render() {
    return (
      <div>Blogposts that feature {this.props.id}</div>
    );
  }
}

export default RestaurantDetailBlogpost;
