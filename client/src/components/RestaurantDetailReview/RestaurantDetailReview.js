import React from 'react';

import './RestaurantDetailReview.css';

class RestaurantDetailReview extends React.Component {
  render() {
    return (
      <div>Reviews of {this.props.id}</div>
    );
  }
}

export default RestaurantDetailReview;
