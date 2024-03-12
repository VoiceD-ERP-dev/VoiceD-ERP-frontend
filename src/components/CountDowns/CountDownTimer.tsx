import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  duration: number;
  colors: string[];
  colorsTime: number[];
  onCountdownComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  colors,
  colorsTime,
  onCountdownComplete,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remainingTime === 0 && onCountdownComplete) {
      onCountdownComplete();
    }
  }, [remainingTime, onCountdownComplete]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return <div>{formattedTime}</div>;
};

export default CountdownTimer;
