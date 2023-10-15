// src/components/PlayButton.js
import React from 'react';
import { PetButton } from '../styles';

const PlayButton = ({ playWithPet }) => {
  return <PetButton onClick={playWithPet}>Play</PetButton>;
};

export default PlayButton;
