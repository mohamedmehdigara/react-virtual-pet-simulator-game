import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CleanlinessContainer, CleanlinessLevel } from '../styles';

// Styled component for the cleanliness label
const StyledCleanlinessText = styled.div`
  font-weight: bold;
  color: var(--cleanliness-text-color); // Text color for the cleanliness label
`;

// Determine the cleanliness color based on the cleanliness value
const getColorBasedOnCleanliness = (cleanliness) => {
  if (cleanliness >= 70) {
    return 'var(--cleanliness-green)';
  } else if (cleanliness >= 30) {
    return 'var(--cleanliness-orange)';
  } else {
    return 'var(--cleanliness-red)';
  }
};

const CleanlinessBar = ({ metricName, cleanliness }) => {
  const cleanlinessColor = getColorBasedOnCleanliness(cleanliness);

  return (
    <CleanlinessContainer>
      <StyledCleanlinessText>{metricName}:</StyledCleanlinessText>
      <CleanlinessLevel cleanliness={cleanliness} color={cleanlinessColor}>
        {cleanliness}%
      </CleanlinessLevel>
    </CleanlinessContainer>
  );
};

// Default props for metricName and cleanliness
CleanlinessBar.defaultProps = {
  metricName: 'Cleanliness',
  cleanliness: 0,
};

// PropTypes for metricName and cleanliness
CleanlinessBar.propTypes = {
  metricName: PropTypes.string,
  cleanliness: PropTypes.number,
};

export default CleanlinessBar;
