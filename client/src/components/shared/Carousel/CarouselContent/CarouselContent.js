import React from 'react';
import { Divider } from '@blueprintjs/core';

import './CarouselContent.css';

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

export default CarouselContent;
