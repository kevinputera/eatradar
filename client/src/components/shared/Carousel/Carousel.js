import React from 'react';
import { Button, Divider } from '@blueprintjs/core';
import { useCarousel } from '../../../hooks/carouselHooks';

import './Carousel.css';

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

function CarouselPageIndicator(props) {
  return (
    <div className="carousel-page-indicator">
      {props.contents &&
        props.contents.map((_, index) => (
          <div
            key={index}
            onClick={() => props.jumpTo(index)}
            className={
              'carousel-page-bar' + (index === props.index ? ' active' : '')
            }
          >
            &nbsp;
          </div>
        ))}
    </div>
  );
}

function CarouselContent(props) {
  const content = props.contents[props.index];
  return (
    <div className="carousel-content">
      {content.title && (
        <>
          <div className="carousel-content-title">{content.title}</div>
          <Divider />
        </>
      )}
      <div className="carousel-content-post">
        {content.post}
        {content.link && (
          <a
            className="carousel-content-link"
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        )}
      </div>
      {content.author && (
        <div className="carousel-content-author">{content.author}</div>
      )}
    </div>
  );
}

function Carousel(props) {
  const [index, handlePrevClick, handleNextClick, jumpTo] = useCarousel({
    contents: props.contents,
    timeout: 3000,
  });

  return (
    <div className="carousel-container">
      <CarouselNavigationButton icon="chevron-left" handleClick={handlePrevClick} />
      <div className="carousel-middle-wrapper">
        <CarouselContent contents={props.contents} index={index} />
        <CarouselPageIndicator
          contents={props.contents}
          index={index}
          jumpTo={jumpTo}
        />
      </div>
      <CarouselNavigationButton icon="chevron-right" handleClick={handleNextClick} />
    </div>
  );
}

export default Carousel;
