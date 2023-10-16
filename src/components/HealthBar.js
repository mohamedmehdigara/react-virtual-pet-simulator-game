import React from 'react';
import { HealthBarContainer, HealthLevel } from '../styles';

const HealthBar = ({ health }) => {
  return (
    <HealthBarContainer>
      <div>Health:</div>
      <HealthLevel health={health}>{health}%</HealthLevel>
    </HealthBarContainer>
  );
};

export default HealthBar;
