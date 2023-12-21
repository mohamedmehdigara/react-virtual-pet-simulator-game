import styled from 'styled-components';

// Container for the entire pet section
export const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Image of the pet
export const CatImage = styled.img`
  max-width: 100%;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
  transform: scale(${(props) => props.happiness / 100}); // Scale based on happiness
`;

// Button for interacting with the pet
export const PetButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

// Container for cleanliness information
export const CleanlinessContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Level of cleanliness
export const CleanlinessLevel = styled.div`
  font-weight: bold;
  color: ${(props) => (props.cleanliness >= 70 ? 'green' : props.cleanliness >= 30 ? 'orange' : 'red')};
  margin-left: 10px;
`;

// Container for energy information
export const EnergyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Level of energy
export const EnergyLevel = styled.div`
  font-weight: bold;
  color: ${(props) => (props.energy >= 70 ? 'green' : props.energy >= 30 ? 'orange' : 'red')};
  margin-left: 10px;
`;

// Container for additional information
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

// Container for health information
export const HealthBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Level of health
export const HealthLevel = styled.div`
  font-weight: bold;
  color: ${(props) => (props.health >= 70 ? 'green' : props.health >= 30 ? 'orange' : 'red')};
  margin-left: 10px;
`;

// Container for mood information
export const MoodIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

// Text for mood
export const MoodText = styled.div`
  font-weight: bold;
  color: ${(props) => (props.mood === 'Happy' ? 'green' : 'red')};
  margin-left: 10px;
`;

export const SleepinessContainer = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  background-color: var(--sleepiness-background-color); // Adjust the color as needed
  margin: 8px 0;
  position: relative;
`;

export const SleepinessLevel = styled.div`
  height: 100%;
  border-radius: 5px;
  width: ${({ sleepiness }) => `${sleepiness}%`};
  background-color: var(--sleepiness-bar-color); // Adjust the color as needed
`;

export const HungerContainer = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  background-color: var(--hunger-background-color); // Adjust the color as needed
  margin: 8px 0 ;
  position: relative;
`;

export const HungerLevel = styled.div`
  height: 100%;
  border-radius: 5px;
  width: ${({ hunger }) => `${hunger}%`};
  background-color: ${({ color }) => color};
`;

export default {
  PetContainer,
  CatImage,
  PetButton,
  CleanlinessContainer,
  CleanlinessLevel,
  EnergyContainer,
  EnergyLevel,
  InfoContainer,
  HealthBarContainer,
  HealthLevel,
  MoodIndicatorContainer,
  MoodText,
  SleepinessContainer,
  SleepinessLevel,
  HungerContainer,
  HungerLevel
};
