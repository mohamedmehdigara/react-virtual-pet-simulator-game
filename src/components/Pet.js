import React, { useState } from 'react';
import {
  PetContainer,
  PetButton,
  InfoContainer,
  CleanlinessContainer,
  CleanlinessLevel,
  EnergyContainer,
  EnergyLevel,
} from '../styles'; // Make sure to import the necessary components from your styles file
import PlayButton from './PlayButton';
import CleanlinessBar from './CleanlinessBar';
import EnergyBar from './EnergyBar'; // Make sure to import the EnergyBar component
import Timer from './Timer';
import PetName from './PetName';
import HealthBar from './HealthBar';
import MoodIndicator from './MoodIndicator';

const CatImage = () => {
  const cat = `
  /\\_/\\
 ( o.o )
  > ^ <`;

  return (
    <pre>
      <code>{cat}</code>
    </pre>
  );
};

const Pet = () => {
  const [name, setName] = useState('Your Pet');
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [health, setHealth] = useState(100);
  const [mood, setMood] = useState('Happy');

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
      <CatImage /> {/* Use the CatImage component to display the cat image */}
      <InfoContainer>
        <CleanlinessBar cleanliness={cleanliness} />
        <EnergyBar metricName="Energy" energy={energy} /> {/* Use EnergyBar component */}
        <Timer decreaseHappiness={decreaseHappiness} decreaseEnergy={decreaseEnergy} />
        <HealthBar health={health} />
        <MoodIndicator mood={mood} />
      </InfoContainer>
      <div>
        <PetButton onClick={feedPet}>Feed</PetButton>
        <PlayButton playWithPet={playWithPet} />
      </div>
    </PetContainer>
  );
};

export default Pet;
