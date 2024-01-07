import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HungerContainer, HungerLevel } from '../styles'; // Make sure to import or adjust the paths as needed

// Styled component for the HungerBar, directly extending HungerContainer
const StyledHungerBar = styled.div`
  /* Add any additional styling for the overall HungerBar container here */
  /* For example, you can set the display property or add a border */
`;

// Styled component for the hunger label
const StyledHungerText = styled.div`
  font-weight: bold;
  color: var(--hunger-text-color); // Text color for the hunger label
`;

const HungerBar = ({ metricName, hunger }) => {
  // Determine the hunger color based on the hunger value
  const hungerColor =
    hunger >= 70
      ? 'var(--hunger-green)'
      : hunger >= 30
      ? 'var(--hunger-orange)'
      : 'var(--hunger-red)';

  return (
    <StyledHungerBar>
      <StyledHungerText>{metricName}:</StyledHungerText>
      {/* Updated the HungerContainer to use the determined hungerColor */}
      <HungerContainer hunger={hunger} color={hungerColor}>
        {/* Updated the HungerLevel to use the determined hungerColor */}
        <HungerLevel hunger={hunger}>{hunger}%</HungerLevel>
      </HungerContainer>
    </StyledHungerBar>
  );
};

// Default props for metricName and hunger
HungerBar.defaultProps = {
  metricName: 'Hunger',
  hunger: 0,
};

// PropTypes for metricName and hunger
HungerBar.propTypes = {
  metricName: PropTypes.string,
  hunger: PropTypes.number,
};

export default HungerBar;
