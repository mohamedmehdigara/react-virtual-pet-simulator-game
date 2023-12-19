import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import only the necessary styled component from your styles.js file
import { SleepinessContainer } from '../styles';

// Styled component for the SleepinessBar, directly extending SleepinessContainer
const StyledSleepinessBar = styled(SleepinessContainer)`
  /* You can adjust any additional styling specific to SleepinessBar here */
  /* For example, you can add margin, padding, or other CSS properties */
`;

// Styled component for the sleepiness label (no need for a separate styled component)
const StyledSleepinessText = styled.div`
  font-weight: bold;
  color: var(--sleepiness-text-color); // Text color for the sleepiness label
`;

const SleepinessBar = ({ metricName, sleepiness }) => {
  // Determine the sleepiness color based on the sleepiness value
  const sleepinessColor =
    sleepiness >= 70
      ? 'var(--sleepiness-green)'
      : sleepiness >= 30
      ? 'var(--sleepiness-orange)'
      : 'var(--sleepiness-red)';

  return (
    <StyledSleepinessBar>
      <StyledSleepinessText>{metricName}:</StyledSleepinessText>
      <SleepinessContainer sleepiness={sleepiness} color={sleepinessColor}>
        {sleepiness}%
      </SleepinessContainer>
    </StyledSleepinessBar>
  );
};

// Default props for metricName and sleepiness
SleepinessBar.defaultProps = {
  metricName: 'Sleepiness',
  sleepiness: 0,
};

// PropTypes for metricName and sleepiness
SleepinessBar.propTypes = {
  metricName: PropTypes.string,
  sleepiness: PropTypes.number,
};

export default SleepinessBar;
