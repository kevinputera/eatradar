import React from 'react';
import { Button, Classes } from '@blueprintjs/core';

import './PaginationControls.css';

function PaginationControls(props) {
  return (
    <div className="pagination-controls">
      <Button
        small
        minimal
        icon="chevron-left"
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
        small
        minimal
        icon="chevron-right"
        onClick={props.handleOffsetIncr}
        style={{ borderRadius: '20px' }}
      />
    </div>
  );
}

export default PaginationControls;
