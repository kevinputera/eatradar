import React from 'react';
import { Icon, Classes } from '@blueprintjs/core';

import './LogoFieldContent.css';

function LogoFieldContentLoading(props) {
  return (
    <div className="logo-field-content">
      <div
        className={'logo-field-content-logo-loading ' + Classes.SKELETON}
      >
        &nbsp;
      </div>
      <div
        className={
          'logo-field-content-content-loading ' + Classes.SKELETON
        }
      >
        &nbsp;
      </div>
    </div>
  );
}

function LogoFieldContent(props) {
  return (
    <div className="logo-field-content">
      <Icon icon={props.icon} className="logo-field-content-logo" />
      <div className="logo-field-content-content">{props.children}</div>
    </div>
  );
}

export { LogoFieldContent, LogoFieldContentLoading };
