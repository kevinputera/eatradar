import React from 'react';

import RefreshLocationAction from './RefreshLocationAction/RefreshLocationAction';
import ZoomAction from './ZoomAction/ZoomAction';

import './MapActionContainer.css';

function MapActionContainer(props) {
  return (
    <div className="map-action-container">
      <RefreshLocationAction refreshLocation={props.refreshLocation} />
      <ZoomAction
        handleZoomIn={props.handleZoomIn}
        handleZoomOut={props.handleZoomOut}
      />
    </div>
  );
}

export default MapActionContainer;
