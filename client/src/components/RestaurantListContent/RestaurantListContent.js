import React from 'react';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';
import { getDistanceString } from '../../utils/conversion';

import './RestaurantListContent.css';

function RestaurantListContent(props) {
  const contents = props.contents.map(content => {
    return (
      <div key={content.id} className="content-button-wrapper">
        <Button
          alignText="left"
          style={{ height: '90px', borderRadius: 0 }}
          active={content.id === props.restaurantSelection}
          onClick={() => props.updateRestaurantSelection(content.id)}
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
                {getDistanceString(Math.round(content.dist))}
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