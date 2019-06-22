import React from 'react';
import { Button, Card, H5, Elevation } from '@blueprintjs/core';

import './RestaurantDetailContainer.css';

class RestaurantDetailContainer extends React.Component {
  render() {
    const restaurant = this.props.contents.find(content => 
      content.id === this.props.restaurantSelection
    );

    return (
      <div className="restaurant-detail-container">
        <div className="close-button-wrapper">
          <Button
            minimal
            icon="cross"
            onClick={this.props.clearRestaurantSelection}
            style={{ borderRadius: '20px' }}
          />
        </div>
        <div className="restaurant-detail-heading">
          <Card 
            elevation={Elevation.ONE}
            style={{ borderRadius: '10px' }}
          >
            <H5>{restaurant ? restaurant.name : null}</H5>
          </Card>
        </div>
      </div>
    );
  }
}

export default RestaurantDetailContainer;