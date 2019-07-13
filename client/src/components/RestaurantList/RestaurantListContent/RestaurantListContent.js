import React from 'react';
import { FixedSizeList } from 'react-window';
import { ButtonGroup, Button, Divider } from '@blueprintjs/core';
import { getDistanceString } from '../../../utils/conversion';

import './RestaurantListContent.css';

function SingleListContent(props) {
  const content = props.data.get(props.index);
  return (
    <div className="content-button-wrapper">
      <Button
        alignText="left"
        style={{ height: '90px', borderRadius: 0 }}
        onClick={() => props.updateRestaurantSelection(content.id)}
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
}

function RestaurantListContent(props) {
  let contents;
  if (props.contents) {
    contents = props.contents.map(content => {
      return (
        <div key={content.id} className="content-button-wrapper">
          <Button
            alignText="left"
            style={{ height: '90px', borderRadius: 0 }}
            active={content.id === props.restaurantSelection}
            onClick={() => props.updateRestaurantSelection(content.id)}
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
  }
  // <FixedSizeList
  //       height={200}
  //       itemCount={20000}
  //       itemSize={20}
  //       width={50}
  //     >
  //       {({ index, style }) => {
  //         return (
  //           <div style={style}>
  //             {index}
  //           </div>
  //         );
  //       }}
  //     </FixedSizeList>

  return (
    <ButtonGroup fill large minimal vertical className="contents-wrapper">
      {contents}
    </ButtonGroup>
  );
}

export default RestaurantListContent;
