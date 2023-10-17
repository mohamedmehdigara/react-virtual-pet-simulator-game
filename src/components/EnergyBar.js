import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled component for the energy label
const StyledEnergyText = styled.div`
  font-weight: bold;
  color: var(--energy-text-color); // Text color for the energy label
`;

// Styled component for the energy level
const EnergyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const EnergyLevel = styled.div`
  font-weight: bold;
  color: ${(props) => props.color};
  margin-left: 10px;
`;

const getColorBasedOnEnergy = (energy) => {
  if (energy >= 70) {
    return 'var(--energy-green)'; // High energy, green color
  } else if (energy >= 30) {
    return 'var(--energy-orange)'; // Medium energy, orange color
  } else {
    return 'var(--energy-red)'; // Low energy, red color
  }
};

const EnergyBar = ({ metricName, energy }) => {
  const energyColor = getColorBasedOnEnergy(energy);

  return (
    <EnergyContainer>
      <StyledEnergyText>{metricName}:</StyledEnergyText>
      <EnergyLevel color={energyColor}>{energy}%</EnergyLevel>
    </EnergyContainer>
  );
};

// Default props for metricName and energy
EnergyBar.defaultProps = {
  metricName: 'Energy',
  energy: 0,
};

// PropTypes for metricName and energy
EnergyBar.propTypes = {
  metricName: PropTypes.string,
  energy: PropTypes.number,
};

export default EnergyBar;
