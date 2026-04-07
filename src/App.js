import React, { useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import styled, { keyframes, css } from 'styled-components';

// --- Advanced Simulation State Engine (Zustand + Persistence) ---
const useStore = create(
  persist(
    (set, get) => ({
      stats: { hunger: 100, energy: 100, happiness: 100, hygiene: 100, health: 100 },
      economy: { coins: 60, xp: 0, level: 1 },
      meta: { isAlive: true, isDaytime: true, status: 'Initializing System...', age: 0 },
      inventory: { food: 5, medicine: 2 },

      // Central Command Dispatcher
      dispatch: (type, payload) => set((state) => {
        if (!state.meta.isAlive && type !== 'REBOOT') return state;
        const { stats, economy, inventory, meta } = state;

        switch (type) {
          case 'FEED':
            if (inventory.food <= 0) return { meta: { ...meta, status: 'Out of food!' } };
            return {
              stats: { ...stats, hunger: Math.min(stats.hunger + 35, 100) },
              inventory: { ...inventory, food: inventory.food - 1 },
              economy: { ...economy, xp: economy.xp + 25 },
              meta: { ...meta, status: 'Delicious! +25 XP' }
            };
          case 'MEDICATE':
            if (inventory.medicine <= 0) return { meta: { ...meta, status: 'No medicine left!' } };
            return {
              stats: { ...stats, health: Math.min(stats.health + 45, 100) },
              inventory: { ...inventory, medicine: inventory.medicine - 1 },
              meta: { ...meta, status: 'Applying treatment...' }
            };
          case 'PURCHASE':
            if (economy.coins < payload.cost) return { meta: { ...meta, status: 'Not enough coins!' } };
            return {
              economy: { ...economy, coins: economy.coins - payload.cost },
              inventory: { ...inventory, [payload.item]: inventory[payload.item] + 1 },
              meta: { ...meta, status: `Bought ${payload.item}` }
            };
          case 'CLEAN':
            return {
              stats: { ...stats, hygiene: 100 },
              economy: { ...economy, xp: economy.xp + 15 },
              meta: { ...meta, status: 'Sparkling clean!' }
            };
          case 'CYCLE_LIGHT':
            return { meta: { ...meta, isDaytime: !meta.isDaytime } };
          case 'PLAY':
            if (stats.energy < 25) return { meta: { ...meta, status: 'Too tired to play...' } };
            return {
              stats: { ...stats, happiness: Math.min(stats.happiness + 30, 100), energy: stats.energy - 25 },
              economy: { ...economy, xp: economy.xp + 65 },
              meta: { ...meta, status: 'Pure Joy! +65 XP' }
            };
          case 'REBOOT':
            return {
              stats: { hunger: 100, energy: 100, happiness: 100, hygiene: 100, health: 100 },
              economy: { coins: 60, xp: 0, level: 1 },
              meta: { isAlive: true, isDaytime: true, status: 'New Life Detected', age: 0 },
              inventory: { food: 5, medicine: 2 }
            };
          default: return state;
        }
      }),

      // The Simulation "Heartbeat" (Tick Logic)
      tick: () => set((state) => {
        if (!state.meta.isAlive) return state;

        const { hunger, energy, happiness, hygiene, health } = state.stats;
        const { isDaytime, age } = state.meta;

        // Scaling difficulty based on Level
        const difficulty = 1 + (state.economy.level * 0.04);

        const newStats = {
          hunger: Math.max(0, hunger - (isDaytime ? 1.6 * difficulty : 0.6)),
          energy: Math.max(0, Math.min(100, energy + (isDaytime ? -1.2 : 6.5))),
          happiness: Math.max(0, happiness - 0.9),
          hygiene: Math.max(0, hygiene - 0.7),
          // Health logic: Passive decay if core needs are critical
          health: Math.max(0, health + (hunger < 15 || hygiene < 15 || energy < 10 ? -2.8 : 0.2))
        };

        // Random Event System
        let eventMsg = state.meta.status;
        let income = isDaytime ? 0.45 : 0.15;
        if (Math.random() > 0.985) {
          income += 20;
          eventMsg = "Lucky day! Found $20";
        }

        return {
          stats: newStats,
          economy: { 
            ...state.economy, 
            level: Math.floor(state.economy.xp / 600) + 1, 
            coins: state.economy.coins + income 
          },
          meta: { ...state.meta, age: age + 1, isAlive: newStats.health > 0, status: eventMsg }
        };
      })
    }),
    { name: 'virtual-pet-v5-omega' }
  )
);

// --- Styled Components: The World Engine ---
const AppFrame = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1.8s ease-in-out;
  background: ${props => props.$day ? '#f1f5f9' : '#020617'};
  padding: 1rem;
`;

const SimulationCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: ${props => props.$day ? 'rgba(255, 255, 255, 0.96)' : 'rgba(30, 41, 59, 0.98)'};
  color: ${props => props.$day ? '#0f172a' : '#f8fafc'};
  backdrop-filter: blur(15px);
  padding: 2.5rem;
  border-radius: 4rem;
  box-shadow: 0 35px 60px -15px rgba(0,0,0,0.5);
  border: 4px solid ${props => props.$crit ? '#ef4444' : 'transparent'};
  filter: ${props => props.$crit ? 'contrast(1.1) brightness(0.95)' : 'none'};
  transition: border 0.3s;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.08); }
`;

const PetVisual = styled.div`
  font-size: 9rem;
  text-align: center;
  margin: 1.5rem 0;
  animation: ${props => props.$active ? css`${float} 4.5s infinite ease-in-out` : 'none'};
  filter: ${props => props.$ill ? 'grayscale(0.8) blur(1px)' : 'none'};
  opacity: ${props => props.$day ? 1 : 0.45};
  transition: all 0.6s ease;
`;

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionBtn = styled.button`
  border: none;
  padding: 1.2rem;
  border-radius: 1.5rem;
  font-weight: 800;
  cursor: pointer;
  background: ${props => props.$color || '#4f46e5'};
  color: white;
  box-shadow: 0 4px 0 rgba(0,0,0,0.15);
  transition: transform 0.1s, box-shadow 0.1s;
  &:active { transform: translateY(2px); box-shadow: none; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const StatRow = ({ label, val, color }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 900, opacity: 0.8 }}>
      <span>{label}</span>
      <span>{Math.round(val)}%</span>
    </div>
    <div style={{ background: 'rgba(0,0,0,0.1)', height: '10px', borderRadius: '5px', marginTop: '6px' }}>
      <div style={{ 
        background: color, 
        width: `${val}%`, 
        height: '100%', 
        borderRadius: '5px', 
        transition: 'width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' 
      }} />
    </div>
  </div>
);

// --- Main Component ---
export default function App() {
  const s = useStore();

  useEffect(() => {
    const heartbeat = setInterval(() => s.tick(), 3000);
    return () => clearInterval(heartbeat);
  }, []);

  const currentEmoji = useMemo(() => {
    if (!s.meta.isAlive) return '🪦';
    if (!s.meta.isDaytime) return '😴';
    if (s.stats.health < 40) return '🤕';
    if (s.economy.level > 12) return '🐲';
    if (s.economy.level > 6) return '🐧';
    if (s.economy.level > 2) return '🐤';
    return '🐣';
  }, [s.meta, s.stats, s.economy]);

  const criticalState = s.stats.health < 35 || s.stats.happiness < 30;

  return (
    <AppFrame $day={s.meta.isDaytime}>
      <SimulationCard $day={s.meta.isDaytime} $crit={criticalState}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, letterSpacing: '1px' }}>
          <span>LV. {s.economy.level}</span>
          <span style={{ color: '#fbbf24' }}>💰 {Math.floor(s.economy.coins)}</span>
        </div>

        <PetVisual $active={s.meta.isAlive} $ill={s.stats.health < 40} $day={s.meta.isDaytime}>
          {currentEmoji}
        </PetVisual>

        <p style={{ textAlign: 'center', fontWeight: 800, minHeight: '1.5rem', color: criticalState ? '#f87171' : 'inherit' }}>
          {s.meta.status}
        </p>

        <section style={{ background: 'rgba(0,0,0,0.04)', padding: '1.5rem', borderRadius: '2.5rem' }}>
          <StatRow label="VITALITY" val={s.stats.health} color="#ef4444" />
          <StatRow label="HUNGER" val={s.stats.hunger} color="#f59e0b" />
          <StatRow label="ENERGY" val={s.stats.energy} color="#3b82f6" />
          <StatRow label="HYGIENE" val={s.stats.hygiene} color="#10b981" />
        </section>

        {s.meta.isAlive ? (
          <ControlGrid>
            <ActionBtn $color="#f59e0b" onClick={() => s.dispatch('FEED')}>Food ({s.inventory.food})</ActionBtn>
            <ActionBtn $color="#3b82f6" onClick={() => s.dispatch('CYCLE_LIGHT')}>{s.meta.isDaytime ? 'Sleep' : 'Wake'}</ActionBtn>
            <ActionBtn $color="#ec4899" onClick={() => s.dispatch('PLAY')}>Interactive Play</ActionBtn>
            <ActionBtn $color="#10b981" onClick={() => s.dispatch('CLEAN')}>Bath Time</ActionBtn>
            <ActionBtn $color="#ef4444" onClick={() => s.dispatch('MEDICATE')}>Medicine ({s.inventory.medicine})</ActionBtn>
            <ActionBtn $color="#6366f1" onClick={() => s.dispatch('PURCHASE', { item: 'food', cost: 30 })}>Shop ($30)</ActionBtn>
          </ControlGrid>
        ) : (
          <ActionBtn $color="#1e293b" style={{ width: '100%', marginTop: '2rem', padding: '1.5rem' }} onClick={() => s.dispatch('REBOOT')}>
            INITIATE RESURRECTION
          </ActionBtn>
        )}

        <footer style={{ marginTop: '2rem', fontSize: '0.65rem', textAlign: 'center', opacity: 0.5, fontWeight: 800 }}>
          CYCLES ELAPSED: {s.meta.age} | NEXT EVOLUTION: {600 - (s.economy.xp % 600)} XP
        </footer>
      </SimulationCard>
    </AppFrame>
  );
}