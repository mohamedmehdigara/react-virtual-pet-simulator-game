// HungerBar.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HungerContainer, HungerLevel } from '../styles'; // Make sure to import or adjust the paths as needed

const StyledHungerText = styled.div`
  font-weight: bold;
  color: var(--hunger-text-color); // Define the text color for the hunger label
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
    <HungerContainer>
      <StyledHungerText>{metricName}:</StyledHungerText>
      <HungerContainer hunger={hunger} color={hungerColor}>
        <HungerLevel hunger={hunger}>{hunger}%</HungerLevel>
      </HungerContainer>
    </HungerContainer>
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
