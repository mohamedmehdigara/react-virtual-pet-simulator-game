import React from 'react';
import { MoodIndicatorContainer, MoodText } from '../styles';

const MoodIndicator = ({ mood }) => {
  return (
    <MoodIndicatorContainer>
      <MoodText>Mood: {mood}</MoodText>
    </MoodIndicatorContainer>
  );
};

export default MoodIndicator;
