// src/components/Pet.js
import React, { useState } from 'react';
import { PetContainer, PetImage, PetButton } from '../styles';
import PlayButton from './PlayButton';
import CleanlinessBar from './CleanlinessBar';
import Timer from './Timer';
import PetName from './PetName';

const Pet = () => {
  const [name, setName] = useState('Your Pet');
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);

  const feedPet = () => {
    setHappiness(happiness + 10);
    setEnergy(energy + 10);
  };

  const playWithPet = () => {
    setHappiness(happiness + 15);
    setCleanliness(cleanliness - 10);
  };

  const decreaseHappiness = (value) => {
    setHappiness(happiness - value);
  };

  const decreaseEnergy = (value) => {
    setEnergy(energy - value);
  };

  return (
    <PetContainer>
      <h1>{name}</h1>
      <PetName setName={setName} />
      <PetImage happiness={happiness} />
      <PetButton onClick={feedPet}>Feed</PetButton>
      <PlayButton playWithPet={playWithPet} />
      <CleanlinessBar cleanliness={cleanliness} />
      <Timer decreaseHappiness={decreaseHappiness} decreaseEnergy={decreaseEnergy} />
    </PetContainer>
  );
};

export default Pet;
