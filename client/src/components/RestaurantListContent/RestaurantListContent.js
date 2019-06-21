import React from 'react';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';

import './RestaurantListContent.css';

function RestaurantListContent(props) {
  const contents = props.contents.map((content, index) => {
    return (
      <div key={content.name + index} className="content-button-wrapper">
        <Button
          alignText="left"
          style={{ height: '90px' }}
          active={index === props.activeRestaurantIndex}
          onClick={() => props.handleRestaurantContentClick(index)}
        >
          <div className="content-button-detail-wrapper bp3-running-text">
            <div>{content.name}</div>
            <div>{content.dist}</div>
            <div>
              <span>{content.block ? `${content.block} ` : ''}</span>
              <span>{content.street}</span>
              <span>{content.unit ? `#${content.unit} ` : ''}</span>
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
      <Divider style={{ margin: 0 }}/>
      {contents}
    </ButtonGroup>
  );
}

export default RestaurantListContent;