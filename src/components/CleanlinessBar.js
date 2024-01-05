import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import only the necessary styled components from your styles.js file
import { CleanlinessContainer } from '../styles';

// Styled component for the CleanlinessBar, directly extending CleanlinessContainer
const StyledCleanlinessBar = styled.div`
  /* Add any additional styling for the overall CleanlinessBar container here */
  /* For example, you can set the display property or add a border */
`;

// Styled component for the cleanliness label (no need for a separate styled component)
const StyledCleanlinessText = styled.div`
  font-weight: bold;
  color: var(--cleanliness-text-color); // Text color for the cleanliness label
`;

const CleanlinessBar = ({ metricName, cleanliness, thresholds }) => {
  // Default color thresholds
  const defaultThresholds = {
    high: 70,
    medium: 30,
  };

  const { high, medium } = { ...defaultThresholds, ...thresholds };

  // Determine the cleanliness color based on the cleanliness value and thresholds
  const cleanlinessColor =
    cleanliness >= high
      ? 'var(--cleanliness-green)'
      : cleanliness >= medium
      ? 'var(--cleanliness-orange)'
      : 'var(--cleanliness-red)';

  return (
    <StyledCleanlinessBar>
      <StyledCleanlinessText role="heading" aria-level="2">
        {metricName}:
      </StyledCleanlinessText>
      <CleanlinessContainer
        cleanliness={cleanliness}
        color={cleanlinessColor}
        role="progressbar"
        aria-valuenow={cleanliness}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {cleanliness}%
      </CleanlinessContainer>
    </StyledCleanlinessBar>
  );
};

// Default props for metricName, cleanliness, and thresholds
CleanlinessBar.defaultProps = {
  metricName: 'Cleanliness',
  cleanliness: 0,
  thresholds: {
    high: 70,
    medium: 30,
  },
};

// PropTypes for metricName, cleanliness, and thresholds
CleanlinessBar.propTypes = {
  metricName: PropTypes.string,
  cleanliness: PropTypes.number,
  thresholds: PropTypes.shape({
    high: PropTypes.number,
    medium: PropTypes.number,
  }),
};

export default CleanlinessBar;
