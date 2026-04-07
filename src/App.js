import React, { useEffect, useMemo, useCallback } from 'react';
import { create } from 'zustand';
import styled, { keyframes, css } from 'styled-components';

// --- Advanced Simulation State (Zustand) ---
const useStore = create((set, get) => ({
  // Core Metrics
  stats: { hunger: 100, energy: 100, happiness: 100, hygiene: 100, health: 100 },
  economy: { coins: 100, xp: 0, level: 1 },
  meta: { isAlive: true, isDaytime: true, status: 'System Initialized', age: 0 },
  inventory: { treats: 2, medicine: 1 },

  // Business Logic: Unified Action Handler
  dispatch: (action) => set((state) => {
    if (!state.meta.isAlive) return state;
    
    const { stats, economy, inventory } = state;
    
    switch (action) {
      case 'FEED_TREAT':
        if (inventory.treats <= 0) return { meta: { ...state.meta, status: 'No treats left!' } };
        return {
          stats: { ...stats, hunger: Math.min(stats.hunger + 30, 100), hygiene: Math.max(stats.hygiene - 5, 0) },
          inventory: { ...inventory, treats: inventory.treats - 1 },
          economy: { ...economy, xp: economy.xp + 20 },
          meta: { ...state.meta, status: 'Delicious treat!' }
        };
      case 'BUY_TREAT':
        if (economy.coins < 15) return { meta: { ...state.meta, status: 'Insufficient funds!' } };
        return {
          economy: { ...economy, coins: economy.coins - 15 },
          inventory: { ...inventory, treats: inventory.treats + 1 },
          meta: { ...state.meta, status: 'Purchased a treat' }
        };
      case 'CLEAN':
        return {
          stats: { ...stats, hygiene: 100, happiness: Math.min(stats.happiness + 10, 100) },
          economy: { ...economy, xp: economy.xp + 10 },
          meta: { ...state.meta, status: 'Scrub a dub dub!' }
        };
      case 'TOGGLE_SLEEP':
        return {
          meta: { ...state.meta, isDaytime: !state.meta.isDaytime, status: state.meta.isDaytime ? 'Zzz...' : 'Awake!' }
        };
      case 'PLAY':
        return {
          stats: { ...stats, happiness: Math.min(stats.happiness + 25, 100), energy: Math.max(stats.energy - 20, 0) },
          economy: { ...economy, xp: economy.xp + 40 },
          meta: { ...state.meta, status: 'Zoomies!' }
        };
      default: return state;
    }
  }),

  // Advanced Game Loop: Simulation Physics
  tick: () => set((state) => {
    if (!state.meta.isAlive) return state;

    const { hunger, energy, happiness, hygiene, health } = state.stats;
    const { isDaytime } = state.meta;

    // Simulation Physics: Weighted Decay
    const hungerDecay = isDaytime ? 1.5 : 0.5;
    const energyDelta = isDaytime ? -1.0 : 4.0;
    const hygieneDecay = 0.8;
    
    // Health logic: If hunger or hygiene are zero, health drops rapidly
    let healthDelta = 0.2; // Passive regen
    if (hunger <= 10) healthDelta -= 2.5;
    if (hygiene <= 10) healthDelta -= 1.5;
    if (energy <= 5) healthDelta -= 1.0;

    const nextStats = {
      hunger: Math.max(0, Math.min(100, hunger - hungerDecay)),
      energy: Math.max(0, Math.min(100, energy + energyDelta)),
      happiness: Math.max(0, Math.min(100, happiness - 0.5)),
      hygiene: Math.max(0, Math.min(100, hygiene - hygieneDecay)),
      health: Math.max(0, Math.min(100, health + healthDelta)),
    };

    const isStillAlive = nextStats.health > 0;
    const newLevel = Math.floor(state.economy.xp / 500) + 1;

    return {
      stats: nextStats,
      meta: { 
        ...state.meta, 
        isAlive: isStillAlive, 
        age: state.meta.age + 1,
        status: isStillAlive ? state.meta.status : 'Critical Failure'
      },
      economy: { 
        ...state.economy, 
        level: newLevel,
        coins: isStillAlive && isDaytime ? state.economy.coins + 0.2 : state.economy.coins 
      }
    };
  }),

  reset: () => set({
    stats: { hunger: 100, energy: 100, happiness: 100, hygiene: 100, health: 100 },
    economy: { coins: 100, xp: 0, level: 1 },
    meta: { isAlive: true, isDaytime: true, status: 'Rebooting...', age: 0 },
    inventory: { treats: 2, medicine: 1 }
  })
}));

// --- Styles: The Matrix Simulation Aesthetic ---
const World = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 2s ease-in-out;
  background: ${props => props.$isDay ? '#f8f9fa' : '#1a1a2e'};
  padding: 20px;
`;

const SimulationFrame = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${props => props.$isDay ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 50, 0.95)'};
  backdrop-filter: blur(20px);
  border-radius: 40px;
  padding: 30px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
  border: 2px solid ${props => props.$health < 30 ? '#ff4757' : 'transparent'};
  color: ${props => props.$isDay ? '#2d3436' : '#ffffff'};
  transition: all 0.5s;
`;

const PetContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.02); }
`;

const Avatar = styled.div`
  font-size: 100px;
  animation: ${props => props.$active ? css`${float} 4s ease-in-out infinite` : 'none'};
  filter: ${props => props.$health < 40 ? 'sepia(0.8) grayscale(0.5)' : 'none'};
  opacity: ${props => props.$isDay ? 1 : 0.6};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 25px;
`;

const BarWrapper = styled.div`
  background: rgba(0,0,0,0.05);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const Bar = styled.div`
  height: 100%;
  width: ${props => props.$pct}%;
  background: ${props => props.$color};
  transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const ControlPad = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 30px;
`;

const ActionBtn = styled.button`
  background: ${props => props.$color || '#6c5ce7'};
  color: white;
  border: none;
  padding: 15px;
  border-radius: 20px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(0,0,0,0.1);
  &:active { transform: translateY(2px); box-shadow: none; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

// --- Main Application ---
export default function App() {
  const store = useStore();

  useEffect(() => {
    const clock = setInterval(() => store.tick(), 1500);
    return () => clearInterval(clock);
  }, []);

  const petEmoji = useMemo(() => {
    if (!store.meta.isAlive) return '💀';
    if (!store.meta.isDaytime) return '🐨';
    if (store.stats.health < 40) return '🤕';
    if (store.stats.hunger < 40) return '🍕';
    if (store.stats.happiness < 40) return '😿';
    return '🐲';
  }, [store.meta, store.stats]);

  return (
    <World $isDay={store.meta.isDaytime}>
      <SimulationFrame $isDay={store.meta.isDaytime} $health={store.stats.health}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, opacity: 0.7 }}>
          <span>LVL {store.economy.level}</span>
          <span>${Math.floor(store.economy.coins)}</span>
        </div>

        <PetContainer>
          <Avatar $active={store.meta.isAlive} $health={store.stats.health} $isDay={store.meta.isDaytime}>
            {petEmoji}
          </Avatar>
          <p style={{ fontWeight: 600, fontSize: '14px' }}>{store.meta.status}</p>
        </PetContainer>

        <StatGrid>
          <StatComponent label="HP" val={store.stats.health} color="#ff4757" />
          <StatComponent label="Hunger" val={store.stats.hunger} color="#ffa502" />
          <StatComponent label="Energy" val={store.stats.energy} color="#2e86de" />
          <StatComponent label="Hygiene" val={store.stats.hygiene} color="#2ed573" />
        </StatGrid>

        {store.meta.isAlive ? (
          <ControlPad>
            <ActionBtn $color="#ffa502" onClick={() => store.dispatch('FEED_TREAT')} disabled={store.inventory.treats === 0}>
              Feed ({store.inventory.treats})
            </ActionBtn>
            <ActionBtn $color="#2e86de" onClick={() => store.dispatch('TOGGLE_SLEEP')}>
              {store.meta.isDaytime ? 'Sleep' : 'Wake'}
            </ActionBtn>
            <ActionBtn $color="#ff9f43" onClick={() => store.dispatch('BUY_TREAT')}>
              Buy Food ($15)
            </ActionBtn>
            <ActionBtn $color="#2ed573" onClick={() => store.dispatch('CLEAN')}>
              Cleanse
            </ActionBtn>
            <ActionBtn $color="#e84393" style={{ gridColumn: 'span 2' }} onClick={() => store.dispatch('PLAY')}>
              Interactive Play
            </ActionBtn>
          </ControlPad>
        ) : (
          <ActionBtn $color="#2d3436" style={{ width: '100%', marginTop: '30px' }} onClick={store.reset}>
            REINITIALIZE LIFE FORM
          </ActionBtn>
        )}

        <footer style={{ marginTop: '20px', fontSize: '10px', textAlign: 'center', opacity: 0.5 }}>
          AGE: {Math.floor(store.meta.age / 10)} cycles | NEXT LVL: {500 - (store.economy.xp % 500)} XP
        </footer>
      </SimulationFrame>
    </World>
  );
}

const StatComponent = ({ label, val, color }) => (
  <div>
    <span style={{ fontSize: '11px', fontWeight: 800 }}>{label}</span>
    <BarWrapper><Bar $pct={val} $color={color} /></BarWrapper>
  </div>
);