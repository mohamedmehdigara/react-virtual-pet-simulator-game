import React, { useState } from 'react';
import {
  PetContainer,
  PetButton,
  InfoContainer,
} from '../styles'; // Import other necessary components from your styles.js file
import PlayButton from './PlayButton';
import CleanlinessBar from './CleanlinessBar';
import EnergyBar from './EnergyBar';
import Timer from './Timer';
import PetName from './PetName';
import HealthBar from './HealthBar';
import MoodIndicator from './MoodIndicator';
import CatImage from './CatImage';
import SleepinessBar from './SleepinessBar';
import HungerBar from './HungerBar'; // Add this line to import the HungerBar component
import SocialMeter from './SocialMeter';
import PetShop from './PetShop';

const Pet = () => {
  const [name, setName] = useState('Your Pet');
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [health, setHealth] = useState(100);
  const [mood, setMood] = useState('Happy');
  const [sleepiness, setSleepiness] = useState(0); // Add sleepiness state
  const [hunger, setHunger] = useState(0); // Add sleepiness state
  const [socialLevel, setSocialLevel] = useState(0);
  const [money, setMoney] = useState(50); // Example initial money value


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

  const handleBuy = (item) => {
    // Implement logic to handle buying items
    // Deduct money, update pet state, etc.
    setMoney((prevMoney) => prevMoney - item.price);
    console.log(`Bought ${item.name} for $${item.price}`);
  };

  return (
    <PetContainer>
      <h1>{name}</h1>
      <PetName setName={setName} />
      <CatImage /> {/* Use the CatImage component to display the cat image */}
      <InfoContainer>
        <CleanlinessBar cleanliness={cleanliness} />
        <EnergyBar metricName="Energy" energy={energy} />
        
          <SleepinessBar sleepiness={sleepiness} />
        

        {/* Display the HungerBar with its label and value */}
        
          <HungerBar hunger={hunger} />
          <SocialMeter socialLevel={socialLevel} />
          <PetShop onBuy={handleBuy} />

        
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
