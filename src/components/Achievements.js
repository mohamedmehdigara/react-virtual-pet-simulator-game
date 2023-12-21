import React, { useState, useEffect } from 'react';

const Achievements = ({ achievedAchievements }) => {
  const [achievements, setAchievements] = useState([]);
  const [inventory, setInventory] = useState();

  useEffect(() => {
    setAchievements(achievedAchievements || []);
  }, [achievedAchievements]);

  const checkAchievements = () => {
    if (!Array.isArray(achievements)) {
      setAchievements([]); // Initialize it as an empty array if it's not an array
      return;
    }

    // Example: Unlock achievement for feeding the pet for the first time
    if (inventory && inventory.some((item) => item.name === 'Food') && !achievements.includes(1)) {
      setAchievements((prevAchievements) => [...prevAchievements, 1]);
    }

    // Add more achievement checks based on your game's criteria
  };

  // Call checkAchievements when the component mounts
  useEffect(() => {
    checkAchievements();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <h2>Achievements</h2>
      <ul>
        {achievements && achievements.map((id) => (
          <li key={id}>Achievement {id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
