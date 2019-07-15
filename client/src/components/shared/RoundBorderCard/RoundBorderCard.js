import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import './RoundBorderCard.css';

function RestaurantDetailCard(props) {
  return (
    <Card
      elevation={Elevation.ONE}
      style={{
        borderRadius: props.radius,
        padding: props.padding,
      }}
    >
      <div className="round-border-card-wrapper">{props.children}</div>
    </Card>
  );
}

export default RestaurantDetailCard;
