import React from 'react';
import { Divider } from '@blueprintjs/core';

import './CarouselContent.css';

function CarouselContent(props) {
  return (
    <div className="carousel-content">
      {props.content.title && (
        <>
          <div className="carousel-content-title">{props.content.title}</div>
          <Divider />
        </>
      )}
      <div className="carousel-content-post">
        {props.content.post}
        {props.content.link && (
          <a
            className="carousel-content-link"
            href={props.content.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        )}
      </div>
      {props.content.author && (
        <div className="carousel-content-author">{props.content.author}</div>
      )}
    </div>
  );
}

export default CarouselContent;
