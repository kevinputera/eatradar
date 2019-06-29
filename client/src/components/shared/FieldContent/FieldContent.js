import React from 'react';

import './FieldContent.css';

function FieldContent(props) {
  return (
    <div className="field-content">
      <div className="field-content-title">{props.title}</div>
      <div className="field-content-body">{props.body}</div>
    </div>
  );
}

export default FieldContent;
