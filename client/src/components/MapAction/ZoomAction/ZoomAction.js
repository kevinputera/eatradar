import React from 'react';

import './ZoomAction.css';

function ZoomAction(props) {
  return (
    <div className="zoom-action">
      <button onClick={props.handleZoomIn}>+</button>
      <button onClick={props.handleZoomOut}>-</button>
    </div>
  );
}

export default ZoomAction;
