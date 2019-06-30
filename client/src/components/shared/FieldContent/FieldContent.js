import React from 'react';

import './FieldContent.css';

function FieldContent(props) {
  const title = props.title && (
    <div className="field-content-title">{props.title}</div>
  );

  const attribution = props.attribution && (
    <img
      className="attribution"
      src={props.attribution}
      alt={props.attributionAlt}
    />
  );

  return (
    <div className="field-content" onClick={props.onClick}>
      {title}
      <div className="field-content-body">{props.body}</div>
      {attribution}
    </div>
  );
}

export default FieldContent;
