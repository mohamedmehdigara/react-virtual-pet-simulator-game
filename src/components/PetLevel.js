import React from 'react';
import styled from 'styled-components';

const PetLevelContainer = styled.div`
  /* Add styling for the pet level container */
  margin-top: 20px;
`;

const PetLevel = ({ level }) => {
  // Define features or items unlocked at different levels
  const levelFeatures = {
    1: 'Basic Toys',
    3: 'Healthy Treats',
    5: 'Fancy Accessories',
    // Add more levels and corresponding features as needed
  };

  // Function to check if a feature is unlocked at the current level
  const isFeatureUnlocked = (featureLevel) => level >= featureLevel;

  return (
    <PetLevelContainer>
      <h2>Pet Level</h2>
      <p>Your pet is currently at Level {level}</p>
      <h3>Unlocked Features:</h3>
      <ul>
        {Object.entries(levelFeatures).map(([featureLevel, featureName]) => (
          <li key={featureLevel} style={{ textDecoration: isFeatureUnlocked(featureLevel) ? 'none' : 'line-through' }}>
            {featureName}
          </li>
        ))}
      </ul>
    </PetLevelContainer>
  );
};

export default PetLevel;
