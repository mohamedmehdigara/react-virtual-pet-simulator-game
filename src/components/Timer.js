// src/components/Timer.js
import React, { useEffect } from 'react';

const Timer = ({ decreaseHappiness, decreaseEnergy }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      decreaseHappiness(5); // Adjust the value as needed
      decreaseEnergy(2); // Adjust the value as needed
    }, 30000); // Update the interval as needed (milliseconds)
    return () => clearInterval(timer);
  }, [decreaseHappiness, decreaseEnergy]);

  return null;
};

export default Timer;
