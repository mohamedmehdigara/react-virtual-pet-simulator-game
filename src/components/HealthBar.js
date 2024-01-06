import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HealthBarContainer, HealthLevel } from '../styles';

// Styled component for the HealthBar, directly extending HealthBarContainer
const StyledHealthBar = styled.div`
  /* Add any additional styling for the overall HealthBar container here */
  /* For example, you can set the display property or add a border */
`;

// Styled component for the health label
const StyledHealthText = styled.div`
  font-weight: bold;
  color: var(--health-text-color); // Text color for the health label
`;

const HealthBar = ({ health, metricName }) => {
  // Determine the health color based on the health value
  const healthColor =
    health >= 70
      ? 'var(--health-green)'
      : health >= 30
      ? 'var(--health-orange)'
      : 'var(--health-red)';

  return (
    <StyledHealthBar>
      <StyledHealthText role="heading" aria-level="2">
        {metricName}:
      </StyledHealthText>
      {/* Updated the HealthLevel to use the determined healthColor */}
      <HealthLevel
        health={health}
        color={healthColor}
        role="progressbar"
        aria-valuenow={health}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {health}%
      </HealthLevel>
      {/* Add a tooltip or additional features if needed */}
    </StyledHealthBar>
  );
};

// Default props for health and metricName
HealthBar.defaultProps = {
  metricName: 'Health',
};

// PropTypes for health and metricName
HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
  metricName: PropTypes.string,
};

export default HealthBar;
