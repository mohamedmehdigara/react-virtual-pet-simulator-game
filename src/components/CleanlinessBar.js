import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import only the necessary styled component from your styles.js file
import { CleanlinessContainer } from '../styles';

// Styled component for the CleanlinessBar, directly extending CleanlinessContainer
const StyledCleanlinessBar = styled(CleanlinessContainer)`
  /* You can adjust any additional styling specific to CleanlinessBar here */
  /* For example, you can add margin, padding, or other CSS properties */
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
