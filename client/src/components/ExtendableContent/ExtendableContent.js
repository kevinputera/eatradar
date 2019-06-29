import React, { useState } from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import { getSummary } from '../../utils/stringUtils';

import './ExtendableContent.css';

function ExtendableContent(props) {
  const [isExtended, setExtended] = useState(false);

  return (
    <div className="extendable-content">
      <Card elevation={Elevation.ONE}>
        <div className="extendable-content-c extendable-content-title">
          <strong>{props.title}</strong>
        </div>
        <Divider />
        <div className="extendable-content-c extendable-content-body">
          {isExtended ? props.body : getSummary(props.body, 20)}
          <span
            className="toggle-extended"
            onClick={() => setExtended(!isExtended)}
          >
            {isExtended ? 'Hide' : 'Extend'}
          </span>
          {isExtended && (
            <a
              className="extendable-content-link"
              href={props.link}
              target="_blank"
            >
              Read more
            </a>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ExtendableContent;
