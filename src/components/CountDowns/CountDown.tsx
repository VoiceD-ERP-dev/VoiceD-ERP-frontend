import React, { useState, useEffect, useRef } from 'react';
import CountdownTimer from './CountDownTimer';

interface CountDownProps {
  onCountdownComplete?: () => void;
  shouldStart: boolean;
  resetKey: number;
}

const CountDown: React.FC<CountDownProps> = ({ onCountdownComplete, shouldStart, resetKey }) => {
  const [key, setKey] = useState(0); // Change key to force remount
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Update key to force remount
  }, [resetKey]);

  useEffect(() => {
    // Reset the timer when key changes
    if (timerRef.current) {
      timerRef.current.reset();
    }
  }, [key]);

  useEffect(() => {
    // Start the timer when shouldStart becomes true
    if (shouldStart && timerRef.current) {
      timerRef.current.start();
    }
  }, [shouldStart]);

  return (
    <CountdownTimer
      key={key}
      duration={10}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      onCountdownComplete={onCountdownComplete}
      ref={timerRef}
    />
  );
};

export default CountDown;