import React from 'react';
import { Button, Tooltip } from '@blueprintjs/core';

import './NavigationButtons.css';

function PageButton(props) {
  return (
    <Button
      minimal
      icon={props.icon}
      onClick={props.handleClick}
      style={{ borderRadius: '20px' }}
    />
  );
}

function NavigationButtons(props) {
  return (
    <div className="navigation-buttons">
      <PageButton icon="chevron-left" handleClick={props.handlePagePrev} />
      <PageButton icon="chevron-right" handleClick={props.handlePageNext} />
    </div>
  );
}

export default NavigationButtons;
