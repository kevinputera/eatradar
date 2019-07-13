import React, { useState } from 'react';
import { Card, Elevation, Divider } from '@blueprintjs/core';
import { getSummary, isSummarizable } from '../../../utils/stringUtils';

import './ExtendableContent.css';

function ExtendableContent(props) {
  const [isExtended, setExtended] = useState(false);

  const title = props.title && (
    <>
      <strong>{props.title}</strong>
      <Divider />
    </>
  );

  const content =
    props.extendable && isSummarizable(props.content, props.count)
      ? isExtended
        ? props.content
        : getSummary(props.content, props.count)
      : props.content;

  const extendBtn = props.extendable &&
    isSummarizable(props.content, props.count) && (
      <span
        className="toggle-extended"
        onClick={() => setExtended(!isExtended)}
      >
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
      <Card elevation={Elevation.ONE} style={{ padding: '5px 15px' }}>
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
