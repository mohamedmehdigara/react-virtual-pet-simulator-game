// HealthBar.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HealthBarContainer, HealthLevel } from '../styles';

// Styled component for the HealthBar, directly extending HealthBarContainer
const StyledHealthBar = styled.div`
  /* Add any additional styling for the overall HealthBar container here */
  /* For example, you can set the display property or add a border */
`;

const HealthBar = ({ health }) => {
  // Determine the health color based on the health value
  const healthColor =
    health >= 70
      ? 'var(--health-green)'
      : health >= 30
      ? 'var(--health-orange)'
      : 'var(--health-red)';

  return (
    <StyledHealthBar>
      <div>Health:</div>
      {/* Updated the HealthLevel to use the determined healthColor */}
      <HealthLevel health={health} color={healthColor}>
        {health}%
      </HealthLevel>
      {/* Add a tooltip or additional features if needed */}
    </StyledHealthBar>
  );
};

// PropTypes for health
HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
};

export default HealthBar;
