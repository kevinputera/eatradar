import React from 'react';

import './CarouselPageIndicator.css';

function CarouselPageIndicator(props) {
  return (
    <div className="carousel-page-indicator">
      {props.contents.map((_, index) => (
        <div
          key={index}
          onClick={() => props.jumpTo(index)}
          className={'carousel-page-bar' + (index === props.index ? ' active' : '')}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
}

export default CarouselPageIndicator;
