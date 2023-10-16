// src/components/CleanlinessBar.js
import React from 'react';
import { CleanlinessContainer, CleanlinessLevel } from '../styles';
import styled from 'styled-components';

const StyledCleanlinessText = styled.div`
  font-weight: bold;
  color: #333;
`;

const CleanlinessBar = ({ cleanliness }) => {
  // Add conditional styling based on cleanliness level
  const getCleanlinessColor = (cleanliness) => {
    if (cleanliness >= 70) {
      return 'green'; // High cleanliness, green color
    } else if (cleanliness >= 30) {
      return 'orange'; // Medium cleanliness, orange color
    } else {
      return 'red'; // Low cleanliness, red color
    }
  };

  const cleanlinessColor = getCleanlinessColor(cleanliness);

  return (
    <CleanlinessContainer>
      <StyledCleanlinessText>Cleanliness:</StyledCleanlinessText>
      <CleanlinessLevel cleanliness={cleanliness} color={cleanlinessColor}>
        {cleanliness}%
      </CleanlinessLevel>
    </CleanlinessContainer>
  );
};

export default CleanlinessBar;
