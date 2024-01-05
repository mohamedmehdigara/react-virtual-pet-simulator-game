import React, { useState, useEffect } from 'react';

// Constants for Achievement IDs
const ACHIEVEMENT_FEED_FIRST_TIME = 1;
const ACHIEVEMENT_CLEANLINESS_LEVEL = 2;
const ACHIEVEMENT_PLAY_COUNT = 3;
const ACHIEVEMENT_SPECIAL_ITEM = 4;

const Achievements = ({ achievedAchievements, inventory }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setAchievements(achievedAchievements || []);
  }, [achievedAchievements]);

  // Unlock achievement function
  const unlockAchievement = (id) => {
    setAchievements((prevAchievements) => {
      const prevAchievementsArray = Array.isArray(prevAchievements) ? prevAchievements : [];
      return [...prevAchievementsArray, id];
    });
  };

  // Individual achievement check functions
  const checkFeedFirstTime = () => {
    if (inventory && inventory.some((item) => item.name === 'Food') && !achievements.includes(ACHIEVEMENT_FEED_FIRST_TIME)) {
      unlockAchievement(ACHIEVEMENT_FEED_FIRST_TIME);
    }
  };

  const checkCleanlinessLevel = () => {
    const cleanlinessLevel = 80;
    if (cleanlinessLevel >= 80 && !achievements.includes(ACHIEVEMENT_CLEANLINESS_LEVEL)) {
      unlockAchievement(ACHIEVEMENT_CLEANLINESS_LEVEL);
    }
  };

  const checkPlayCount = () => {
    const playCountThreshold = 5;
    const playCount = 3; // Replace with your actual play count
    if (playCount >= playCountThreshold && !achievements.includes(ACHIEVEMENT_PLAY_COUNT)) {
      unlockAchievement(ACHIEVEMENT_PLAY_COUNT);
    }
  };

  const checkSpecialItem = () => {
    const hasSpecialItem = inventory && inventory.some((item) => item.name === 'SpecialItem');
    if (hasSpecialItem && !achievements.includes(ACHIEVEMENT_SPECIAL_ITEM)) {
      unlockAchievement(ACHIEVEMENT_SPECIAL_ITEM);
    }
  };

  // Main achievement check function
  const checkAchievements = () => {
    checkFeedFirstTime();
    checkCleanlinessLevel();
    checkPlayCount();
    checkSpecialItem();
    // Add more checks as needed
  };

  // Call checkAchievements when the component mounts and whenever the inventory changes
  useEffect(() => {
    checkAchievements();
  }, [inventory]);

  return (
    <div>
      <h2>Achievements</h2>
      <ul>
        {achievements &&
          achievements.map((id) => {
            const achievementsList = [
              { id: ACHIEVEMENT_FEED_FIRST_TIME, description: 'Feed the pet for the first time' },
              { id: ACHIEVEMENT_CLEANLINESS_LEVEL, description: 'Reach a cleanliness level of 80' },
              { id: ACHIEVEMENT_PLAY_COUNT, description: 'Play with the pet 5 times' },
              { id: ACHIEVEMENT_SPECIAL_ITEM, description: 'Have a special item in the inventory' },
            ];

            const achievement = achievementsList.find((a) => a.id === id);
            return achievement && <li key={id}>Achievement {id}: {achievement.description}</li>;
          })}
      </ul>
    </div>
  );
};

export default Achievements;
