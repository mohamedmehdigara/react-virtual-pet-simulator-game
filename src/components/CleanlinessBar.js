// CleanlinessBar.js
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

const CleanlinessBar = ({ metricName, cleanliness }) => {
  // Determine the cleanliness color based on the cleanliness value
  const cleanlinessColor =
    cleanliness >= 70
      ? 'var(--cleanliness-green)'
      : cleanliness >= 30
      ? 'var(--cleanliness-orange)'
      : 'var(--cleanliness-red)';

  return (
    <StyledCleanlinessBar>
      <StyledCleanlinessText>{metricName}:</StyledCleanlinessText>
      {/* Updated the CleanlinessContainer to use the determined cleanlinessColor */}
      <CleanlinessContainer cleanliness={cleanliness} color={cleanlinessColor}>
        {cleanliness}%
      </CleanlinessContainer>
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
