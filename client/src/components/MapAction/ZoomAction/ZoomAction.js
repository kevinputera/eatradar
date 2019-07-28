import React from 'react';
import { Button } from '@blueprintjs/core';

import './ZoomAction.css';

function ZoomAction(props) {
  return (
    <div className="zoom-action">
      <div className="zoom-control">
        <Button
          large
          icon="plus"
          className="zoom-in-button"
          onClick={props.handleZoomIn}
          style={{ borderRadius: '20px' }}
        />
      </div>
      <div className="zoom-control">
        <Button
          large
          icon="minus"
          className="zoom-out-button"
          onClick={props.handleZoomOut}
          style={{ borderRadius: '20px' }}
        />
      </div>
    </div>
  );
}

export default ZoomAction;
