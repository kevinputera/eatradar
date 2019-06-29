import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

import './ExtendableContent.css';

class ExtendableContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="extendable-content">
        <Card elevation={Elevation.ONE}>
          <div className="extendable-content-c extendable-content-title">
            <strong>{this.props.title}</strong>
          </div>
          <div className="extendable-content-c extendable-content-body">{this.props.body}</div>
          <div className="extendable-content-c extendable-content-link">{this.props.link}</div>
        </Card>
      </div>
    );
  }
}

export default ExtendableContent;
