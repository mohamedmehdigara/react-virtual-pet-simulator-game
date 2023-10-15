// src/components/PetName.js
import React, { useState } from 'react';

const PetName = ({ setName }) => {
  const [nameInput, setNameInput] = useState('');

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleNameSubmit = () => {
    setName(nameInput);
  };

  return (
    <div>
      <input type="text" placeholder="Name your pet" onChange={handleNameChange} />
      <button onClick={handleNameSubmit}>Set Name</button>
    </div>
  );
};

export default PetName;
