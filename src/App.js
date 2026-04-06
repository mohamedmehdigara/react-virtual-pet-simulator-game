import React, { useEffect } from 'react';
import { create } from 'zustand';
import styled, { keyframes } from 'styled-components';

// --- State Management (Zustand) ---
const useStore = create((set) => ({
  hunger: 100,
  happiness: 100,
  energy: 100,
  isAlive: true,
  status: 'Happy',
  
  feed: () => set((state) => ({ 
    hunger: Math.min(state.hunger + 15, 100),
    status: 'Eating...' 
  })),
  play: () => set((state) => ({ 
    happiness: Math.min(state.happiness + 15, 100),
    energy: Math.max(state.energy - 10, 0),
    status: 'Playing!' 
  })),
  sleep: () => set((state) => ({ 
    energy: Math.min(state.energy + 20, 100),
    hunger: Math.max(state.hunger - 5, 0),
    status: 'Zzz...' 
  })),
  tick: () => set((state) => {
    const newHunger = Math.max(state.hunger - 2, 0);
    const newHappiness = Math.max(state.happiness - 1, 0);
    const newEnergy = Math.max(state.energy - 1.5, 0);
    const stillAlive = newHunger > 0 && newHappiness > 0 && newEnergy > 0;
    
    return {
      hunger: newHunger,
      happiness: newHappiness,
      energy: newEnergy,
      isAlive: stillAlive,
      status: stillAlive ? (newHunger < 30 ? 'Hungry' : state.status) : 'Grave'
    };
  }),
  restart: () => set({ hunger: 100, happiness: 100, energy: 100, isAlive: true, status: 'Happy' })
}));

// --- Styled Components ---
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f0f4f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const PetCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
  width: 350px;
`;

const PetAvatar = styled.div`
  font-size: 80px;
  margin: 1rem 0;
  animation: ${props => props.$isAlive ? bounce : 'none'} 2s infinite ease-in-out;
  filter: ${props => props.$isAlive ? 'none' : 'grayscale(100%)'};
`;

const StatBarContainer = styled.div`
  margin: 10px 0;
  text-align: left;
`;

const Label = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #4a5568;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #edf2f7;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$value}%;
  background: ${props => props.$color};
  transition: width 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 12px;
  background: #667eea;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;

  &:hover { background: #5a67d8; }
  &:active { transform: scale(0.95); }
  &:disabled { background: #cbd5e0; cursor: not-allowed; }
`;

const StatusText = styled.p`
  font-weight: bold;
  color: #2d3748;
  height: 20px;
`;

// --- Main Component ---
const App = () => {
  const { hunger, happiness, energy, isAlive, status, feed, play, sleep, tick, restart } = useStore();

  useEffect(() => {
    let timer;
    if (isAlive) {
      timer = setInterval(() => {
        tick();
      }, 3000); // Updates every 3 seconds
    }
    return () => clearInterval(timer);
  }, [isAlive, tick]);

  const getPetEmoji = () => {
    if (!isAlive) return '🪦';
    if (hunger < 30) return '🤤';
    if (energy < 30) return '😴';
    if (happiness < 30) return '😢';
    return '🐱';
  };

  return (
    <Container>
      <PetCard>
        <h1>Virtual Pet</h1>
        <StatusText>{isAlive ? `Status: ${status}` : 'Game Over'}</StatusText>
        
        <PetAvatar $isAlive={isAlive}>
          {getPetEmoji()}
        </PetAvatar>

        <StatBarContainer>
          <Label>Hunger ({Math.round(hunger)}%)</Label>
          <ProgressBar>
            <ProgressFill $value={hunger} $color="#f56565" />
          </ProgressBar>
        </StatBarContainer>

        <StatBarContainer>
          <Label>Happiness ({Math.round(happiness)}%)</Label>
          <ProgressBar>
            <ProgressFill $value={happiness} $color="#ed64a6" />
          </ProgressBar>
        </StatBarContainer>

        <StatBarContainer>
          <Label>Energy ({Math.round(energy)}%)</Label>
          <ProgressBar>
            <ProgressFill $value={energy} $color="#4299e1" />
          </ProgressBar>
        </StatBarContainer>

        {isAlive ? (
          <ButtonGroup>
            <ActionButton onClick={feed}>Feed</ActionButton>
            <ActionButton onClick={play}>Play</ActionButton>
            <ActionButton onClick={sleep}>Sleep</ActionButton>
          </ButtonGroup>
        ) : (
          <ActionButton 
            style={{ width: '100%', marginTop: '20px', background: '#48bb78' }} 
            onClick={restart}
          >
            Try Again
          </ActionButton>
        )}
      </PetCard>
    </Container>
  );
};

export default App;
