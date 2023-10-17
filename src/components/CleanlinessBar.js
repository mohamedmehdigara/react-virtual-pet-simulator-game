import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import styled components from your styles.js file
import { CleanlinessContainer, CleanlinessLevel } from '../styles';

// Styled component for the cleanliness label
const StyledCleanlinessText = styled.div`
  font-weight: bold;
  color: var(--cleanliness-text-color); // Text color for the cleanliness label
`;

// Styled component for the CleanlinessBar
const StyledCleanlinessBar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const CleanlinessBar = ({ metricName, cleanliness }) => {
  const cleanlinessColor =
    cleanliness >= 70
      ? 'var(--cleanliness-green)'
      : cleanliness >= 30
      ? 'var(--cleanliness-orange)'
      : 'var(--cleanliness-red)';

  return (
    <StyledCleanlinessBar>
      <StyledCleanlinessText>{metricName}:</StyledCleanlinessText>
      <CleanlinessLevel cleanliness={cleanliness} color={cleanlinessColor}>
        {cleanliness}%
      </CleanlinessLevel>
    </StyledCleanlinessBar>
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
