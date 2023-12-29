import React, { useState, useEffect } from 'react';

const Training = ({ onTrainingComplete }) => {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  // Simulate training progress
  useEffect(() => {
    let trainingInterval;

    const startTraining = () => {
      setIsTraining(true);

      trainingInterval = setInterval(() => {
        setTrainingProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 10;
          } else {
            // Training complete
            clearInterval(trainingInterval);
            setIsTraining(false);
            onTrainingComplete();
            return 0;
          }
        });
      }, 1000);
    };

    // Start training when component mounts
    startTraining();

    // Clean up the interval when component unmounts
    return () => clearInterval(trainingInterval);
  }, [onTrainingComplete]);

  return (
    <div>
      <h2>Training Area</h2>
      {isTraining ? (
        <p>Training in progress... {trainingProgress}%</p>
      ) : (
        <button onClick={() => setTrainingProgress(0)}>Start Training</button>
      )}
    </div>
  );
};

export default Training;
