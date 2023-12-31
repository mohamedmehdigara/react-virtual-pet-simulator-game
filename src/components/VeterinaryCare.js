import React, { useState } from 'react';
import styled from 'styled-components';

const VeterinaryCareContainer = styled.div`
  /* Add styling for the veterinary care container */
  margin-top: 20px;
`;

const VeterinaryCareButton = styled.button`
  /* Add styling for the veterinary care button */
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c0392b;
  }
`;

const VeterinaryCare = ({ onTreatment }) => {
  const [isPetSick, setIsPetSick] = useState(false);

  const handleTreatment = () => {
    // Simulate a check-up or treatment
    setIsPetSick(false);
    onTreatment(); // You can pass additional data or trigger specific actions when treatment is applied
    console.log('Pet has received veterinary care!');
  };

  return (
    <VeterinaryCareContainer>
      <h2>Veterinary Care</h2>
      {isPetSick ? (
        <div>
          <p>Your pet is not feeling well. Would you like to take it to the vet?</p>
          <VeterinaryCareButton onClick={handleTreatment}>Yes, take to vet</VeterinaryCareButton>
        </div>
      ) : (
        <p>Your pet is healthy. No need for veterinary care right now.</p>
      )}
    </VeterinaryCareContainer>
  );
};

export default VeterinaryCare;
