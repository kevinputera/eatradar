import React from 'react';
import { Button } from '@blueprintjs/core';

import './RefreshLocationAction.css';

function RefreshLocationAction(props) {
  return (
    <div className="refresh-location-action">
      <Button
        large
        icon="locate"
        onClick={props.refreshLocation}
        style={{ borderRadius: '20px' }}
      />
    </div>
  );
}

export default RefreshLocationAction;
