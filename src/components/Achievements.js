import React, { useState, useEffect } from 'react';

const Achievements = ({ achievedAchievements, inventory }) => {
  const [achievements, setAchievements] = useState([]);

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
      setAchievements((prevAchievements) => {
        // Ensure prevAchievements is an array before spreading
        const prevAchievementsArray = Array.isArray(prevAchievements) ? prevAchievements : [];
        return [...prevAchievementsArray, 1];
      });
    }

    // Example: Unlock achievement for reaching a certain level of cleanliness
    const cleanlinessLevel = 80;
    if (cleanlinessLevel >= 80 && !achievements.includes(2)) {
      setAchievements((prevAchievements) => {
        const prevAchievementsArray = Array.isArray(prevAchievements) ? prevAchievements : [];
        return [...prevAchievementsArray, 2];
      });
    }

    // Example: Unlock achievement for playing with the pet a specific number of times
    const playCountThreshold = 5;
    const playCount = 3; // Replace with your actual play count
    if (playCount >= playCountThreshold && !achievements.includes(3)) {
      setAchievements((prevAchievements) => {
        const prevAchievementsArray = Array.isArray(prevAchievements) ? prevAchievements : [];
        return [...prevAchievementsArray, 3];
      });
    }

    // Add more achievement checks based on your game's criteria
  };

  // Call checkAchievements when the component mounts and whenever the inventory changes
  useEffect(() => {
    checkAchievements();
  }, [inventory]); // Run whenever inventory changes

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
