import React from 'react';
import { useCarousel } from '../../../hooks/carouselHooks';

import CarouselNavigationButton from './CarouselNavigationButton/CarouselNavigationButton';
import CarouselPageIndicator from './CarouselPageIndicator/CarouselPageIndicator';
import CarouselContent from './CarouselContent/CarouselContent';

import './Carousel.css';

function Carousel(props) {
  const [index, handlePrevClick, handleNextClick, jumpTo] = useCarousel({
    length: props.contents.length,
    timeout: 6000,
  });

  return (
    <div className="carousel-container">
      <CarouselNavigationButton icon="chevron-left" handleClick={handlePrevClick} />
      <div className="carousel-middle-wrapper">
        <CarouselContent content={props.contents[index]} />
        <CarouselPageIndicator
          length={props.contents.length}
          index={index}
          jumpTo={jumpTo}
        />
      </div>
      <CarouselNavigationButton icon="chevron-right" handleClick={handleNextClick} />
    </div>
  );
}

export default Carousel;
