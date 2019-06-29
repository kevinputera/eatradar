import React, { useEffect } from 'react';

import './CircularOpeningIndicator.css';

function CircularOpeningIndicator(props) {
  const canvasMorningRef = React.createRef();
  const canvasNightRef = React.createRef();

  useEffect(() => {
    const canvasMorning = canvasMorningRef.current;
    const ctxMorning = canvasMorning.getContext('2d');
    ctxMorning.fillStyle = '#2B95D6';
    ctxMorning.beginPath();
    ctxMorning.arc(60, 60, 50, 0, Math.PI);
    ctxMorning.stroke();
    ctxMorning.fill();

    const ctxNight = canvasNightRef.current.getContext('2d');

    return () => {
      ctxMorning.clearRect(0, 0, 120, 120);
      ctxNight.clearRect(0, 0, 120, 120);
    };
  });

  return (
    <div className="circular-opening-indicator">
      <canvas
        ref={canvasMorningRef}
        width="120px"
        height="120px"
        className="circular-opening-morning"
      />
      <canvas
        ref={canvasNightRef}
        width="120px"
        height="120px"
        className="circular-opening-night"
      />
    </div>
  );
}

export default CircularOpeningIndicator;
