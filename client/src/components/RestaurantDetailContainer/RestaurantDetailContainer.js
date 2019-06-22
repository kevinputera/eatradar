import React from 'react';
import { Button } from '@blueprintjs/core';

import './RestaurantDetailContainer.css';

class RestaurantDetailContainer extends React.Component {
  render() {
    return (
      <div className="restaurant-detail-container">
        <div className="close-button-wrapper">
          <Button
            large
            minimal
            icon="cross"
            onClick={this.props.clearRestaurantSelection}
            style={{ borderRadius: '20px' }}
          />
        </div>
      </div>
    );
  }
}

export default RestaurantDetailContainer;