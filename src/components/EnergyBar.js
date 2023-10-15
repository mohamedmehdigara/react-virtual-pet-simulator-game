// src/components/EnergyBar.js
import React from 'react';
import { EnergyContainer, EnergyLevel } from '../styles';

const EnergyBar = ({ energy }) => {
  return (
    <EnergyContainer>
      <div>Energy:</div>
      <EnergyLevel energy={energy}>{energy}%</EnergyLevel>
    </EnergyContainer>
  );
};

export default EnergyBar;
