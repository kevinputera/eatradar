import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import './RestaurantDetailCard.css';

function RestaurantDetailCard(props) {
  return (
    <div className="restaurant-detail-card">
      <Card elevation={Elevation.ONE} style={{ borderRadius: '10px' }}>
        <div className="restaurant-detail-card-wrapper">{props.children}</div>
      </Card>
    </div>
  );
}

export default RestaurantDetailCard;
