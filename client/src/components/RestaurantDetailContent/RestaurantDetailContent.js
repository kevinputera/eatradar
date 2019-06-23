import React from 'react';

import './RestaurantDetailContent.css';

class RestaurantDetailContent extends React.Component {
  render() {
    return (
      <div>Details of {this.props.id}</div>
    )
  }
}

export default RestaurantDetailContent;
