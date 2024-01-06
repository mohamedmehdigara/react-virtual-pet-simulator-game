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

const getColorBasedOnEnergy = (energy, thresholds) => {
  const { high, medium } = thresholds;

  if (energy >= high) {
    return 'var(--energy-green)'; // High energy, green color
  } else if (energy >= medium) {
    return 'var(--energy-orange)'; // Medium energy, orange color
  } else {
    return 'var(--energy-red)'; // Low energy, red color
  }
};

const EnergyBar = ({ metricName, energy, thresholds }) => {
  const energyColor = getColorBasedOnEnergy(energy, thresholds);

  return (
    <EnergyContainer>
      <StyledEnergyText role="heading" aria-level="2">
        {metricName}:
      </StyledEnergyText>
      <EnergyLevel
        color={energyColor}
        role="progressbar"
        aria-valuenow={energy}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {energy}%
      </EnergyLevel>
    </EnergyContainer>
  );
};

// Default props for metricName, energy, and thresholds
EnergyBar.defaultProps = {
  metricName: 'Energy',
  energy: 0,
  thresholds: {
    high: 70,
    medium: 30,
  },
};

// PropTypes for metricName, energy, and thresholds
EnergyBar.propTypes = {
  metricName: PropTypes.string,
  energy: PropTypes.number,
  thresholds: PropTypes.shape({
    high: PropTypes.number,
    medium: PropTypes.number,
  }),
};

export default EnergyBar;
