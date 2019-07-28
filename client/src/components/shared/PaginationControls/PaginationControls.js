import React from 'react';
import { Button, Classes } from '@blueprintjs/core';

import './PaginationControls.css';

function PaginationControls(props) {
  return (
    <div className="pagination-controls">
      <Button
        minimal
        small={props.small}
        icon="chevron-left"
        className="pagination-controls-decr-button"
        onClick={props.handleOffsetDecr}
        style={{ borderRadius: '20px' }}
      />
      {props.indicator && (
        <div
          className={
            'pagination-offset-indicator' +
            (props.small ? ' ' + Classes.TEXT_SMALL : '')
          }
        >
          {props.offset}
        </div>
      )}
      <Button
        minimal
        small={props.small}
        icon="chevron-right"
        className="pagination-controls-incr-button"
        onClick={props.handleOffsetIncr}
        style={{ borderRadius: '20px' }}
      />
    </div>
  );
}

export default PaginationControls;
