import React, { useState } from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import { getSummary } from '../../../utils/stringUtils';

import './ExtendableContent.css';

function ExtendableContent(props) {
  const [isExtended, setExtended] = useState(false);

  const title = props.title && (
    <>
      <strong>{props.title}</strong>
      <Divider />
    </>
  );

  const content = props.extendable
    ? isExtended
      ? props.body
      : getSummary(props.body, 20)
    : props.body;

  const extendBtn = props.extendable && (
    <span className="toggle-extended" onClick={() => setExtended(!isExtended)}>
      {isExtended ? 'Hide' : 'Extend'}
    </span>
  );

  const link = props.link && isExtended && (
    <a
      className="extendable-content-link"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Read more
    </a>
  );

  return (
    <div className="extendable-content">
      <Card elevation={Elevation.ONE} style={{ padding: '12px 23px' }}>
        <div className="extendable-content-c extendable-content-title">
          {title}
        </div>
        <div className="extendable-content-c extendable-content-body">
          {content}
          {extendBtn}
          {link}
        </div>
        <div className="extendable-content-c extendable-content-footer">
          {props.footer && `- ${props.footer}`}
        </div>
      </Card>
    </div>
  );
}

export default ExtendableContent;
