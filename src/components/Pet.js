// Pet.js
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
import HungerBar from './HungerBar';
import SocialMeter from './SocialMeter';
import PetShop from './PetShop';
import Money from './Money'; // Import the Money component
import Inventory from './Inventory';
import Achievements from './Achievements';
import Weather from './Weather';
import Training from './Training';
import VeterinaryCare from './VeterinaryCare'; // Add this line to import VeterinaryCare
import PetLevel from './PetLevel';

const Pet = () => {
  const [name, setName] = useState('Your Pet');
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [health, setHealth] = useState(100);
  const [mood, setMood] = useState('Happy');
  const [sleepiness, setSleepiness] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [socialLevel, setSocialLevel] = useState(0);
  const [money, setMoney] = useState(50);
  const [inventory, setInventory] = useState([]); // State for inventory items
  const [achievedAchievements, setAchievedAchievements] = useState([]);
  const [currentWeather, setCurrentWeather] = useState('sunny'); // Example initial weather
  const [petLevel, setPetLevel] = useState(1); // Add petLevel state

  const handleTaskComplete = (stat, value) => {
    // Update pet stats based on completed task
    if (stat === 'happiness') {
      setHappiness((prevHappiness) => prevHappiness + value);
    } else if (stat === 'energy') {
      setEnergy((prevEnergy) => prevEnergy + value);
    } else if (stat === 'cleanliness') {
      setCleanliness((prevCleanliness) => prevCleanliness + value);
    }
    // Add more conditions for other stats as needed
  };

  const feedPet = () => {
    setHappiness(happiness + 10);
    setEnergy(energy + 10);
    setHunger(hunger - 10);
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
    setInventory((prevInventory) => [...prevInventory, item]);

    console.log(`Bought ${item.name} for $${item.price}`);
  };


  const checkAchievements = () => {
    if (!Array.isArray(achievedAchievements)) {
      setAchievedAchievements([]); // Initialize it as an empty array if it's not an array
      return;
    }
  
    // Example: Unlock achievement for feeding the pet for the first time
    if (inventory.some((item) => item.name === 'Food') && !achievedAchievements.includes(1)) {
      setAchievedAchievements((prevAchievements) => [...prevAchievements, 1]);
    }
  
    // Add more achievement checks based on your game's criteria
  };
  

  // Call the checkAchievements function whenever there is a relevant action
  // For example, after feeding or playing with the pet
  // You can customize this based on your game's logic
  React.useEffect(() => {
    checkAchievements();
  }, [inventory, achievedAchievements]);

   const handleWeatherChange = (newMood) => {
    // Adjust pet's mood based on weather
    setMood(newMood);
  };

  const handleTrainingComplete = () => {
    // You can add logic for what happens when training is complete
    // For example, increase a skill or attribute
    console.log('Training complete! Your pet has improved.');
    setHappiness(happiness + 5);
    setEnergy(energy + 5);
  };

  const handleVeterinaryCare = () => {
    console.log('Taking pet to the vet.');
    // Simulate a pet getting sick
    setHealth(70);
    // Set pet to sick state
    setAchievedAchievements((prevAchievements) => [...prevAchievements, 'Sick Pet']);
  };

  return (
    <PetContainer>
      <h1>{name}</h1>
      <PetName setName={setName} />
      <CatImage />
      <InfoContainer>
        <CleanlinessBar cleanliness={cleanliness} />
        <EnergyBar metricName="Energy" energy={energy} />
        <SleepinessBar sleepiness={sleepiness} />
        <HungerBar hunger={hunger} />
        <HealthBar health={health} />

        <SocialMeter socialLevel={socialLevel} />
        <Money money={money} /> {/* Add the Money component */}
        <PetShop onBuy={handleBuy} money={money} />
        <Inventory items={inventory} /> {/* Add the Inventory component */}
        <Achievements achievedAchievements={setAchievedAchievements} /> {/* Add the Achievements component */}

        <Timer decreaseHappiness={decreaseHappiness} decreaseEnergy={decreaseEnergy} />
                <Weather currentWeather={currentWeather} onWeatherChange={handleWeatherChange} />

        <MoodIndicator mood={mood} />
        <Training onTrainingComplete={handleTrainingComplete} />
        <VeterinaryCare onTreatment={handleVeterinaryCare} />
        <PetLevel level={petLevel} />


      </InfoContainer>
      <div>
        <PetButton onClick={feedPet}>Feed</PetButton>
        <PlayButton playWithPet={playWithPet} />
      </div>
    </PetContainer>
  );
};

export default Pet;
