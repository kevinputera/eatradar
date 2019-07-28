import React from 'react';
import { Button } from '@blueprintjs/core';

import './CarouselNavigationButton.css';

function CarouselNavigationButton(props) {
  return (
    <div className="carousel-nav-button">
      <Button
        small
        minimal
        icon={props.icon}
        onClick={props.handleClick}
        style={{ borderRadius: '20px' }}
      />
    </div>
  );
}

export default CarouselNavigationButton;
