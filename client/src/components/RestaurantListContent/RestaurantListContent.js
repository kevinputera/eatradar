import React from 'react';
import { ButtonGroup, Button, Divider, H3 } from '@blueprintjs/core';

import './RestaurantListContent.css';

function RestaurantListContent(props) {
  const contents = props.contents.map((content, index) => {
    return (
      <div key={content.name + index} className="content-button-wrapper">
        <Button
          alignText="left"
          style={{ height: '90px', borderRadius: 0 }}
          active={index === props.activeRestaurantIndex}
          onClick={() => props.handleRestaurantContentClick(index)}
        >
          <div className="content-button-detail-wrapper bp3-running-text">
            <section className="restaurant-identity">
              <div>{content.name}</div>
              <span>{content.block ? `${content.block} ` : ''}</span>
              <span>{content.street}</span>
              <span>{content.unit ? ` #${content.unit} ` : ''}</span>
            </section>
            <div className="restaurant-distance-wrapper">
              <div className="restaurant-distance">
                {Math.round(content.dist)}m
              </div>
            </div>
          </div>
        </Button>
        <Divider style={{ margin: 0 }}/>
      </div>
    );
  });
   
  return (
    <ButtonGroup 
      fill
      large
      minimal
      vertical
      className="contents-wrapper"
    >
      {contents}
    </ButtonGroup>
  );
}

export default RestaurantListContent;