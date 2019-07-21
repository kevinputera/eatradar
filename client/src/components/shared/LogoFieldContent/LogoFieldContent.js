import React from 'react';
import { Icon } from '@blueprintjs/core';

import './LogoFieldContent.css';

function LogoFieldContent(props) {
  return (
    <div className="logo-field-content">
      <Icon icon={props.icon} className="logo-field-content-logo" />
      <div className="logo-field-content-content">{props.children}</div>
    </div>
  );
}

export default LogoFieldContent;
