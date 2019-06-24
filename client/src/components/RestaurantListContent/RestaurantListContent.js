import React from 'react';
import Immutable from 'immutable';
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
          active={Immutable.is(content, props.restaurantSelection)}
          onClick={() => props.updateRestaurantSelection(content)}
        >
          <div className="content-button-detail-wrapper bp3-running-text">
            <section className="restaurant-list-identity">
              <div className="restaurant-list-name">{content.name}</div>
              <div className="restaurant-list-address">
                <span>{content.block ? `${content.block} ` : ''}</span>
                <span>{content.street}</span>
              </div>
            </section>
            <div className="restaurant-list-distance-wrapper">
              <div className="restaurant-list-distance">
                {getDistanceString(content.dist)}
              </div>
            </div>
          </div>
        </Button>
        <Divider style={{ margin: 0 }} />
      </div>
    );
  });

  return (
    <ButtonGroup fill large minimal vertical className="contents-wrapper">
      {contents}
    </ButtonGroup>
  );
}

export default RestaurantListContent;
