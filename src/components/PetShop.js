// PetShop.js
import React from 'react';
import styled from 'styled-components';

// Styled components for the shop container and individual shop items
const ShopContainer = styled.div`
  /* Add any styling for the shop container */
  border: 2px solid #3498db;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
`;

const ShopItem = styled.div`
  /* Add any styling for individual shop items */
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PetShop = ({ onBuy, money }) => {
  // Define your shop items and their prices
  const shopItems = [
    { id: 1, name: 'Toy', price: 10 },
    { id: 2, name: 'Food', price: 5 },
    { id: 3, name: 'Accessory', price: 15 },
  ];

  // Handler for buying items
  const handleBuy = (item) => {
    // Check if the user has enough money to buy the item
    if (money >= item.price) {
      // Call the onBuy function to handle the purchase
      onBuy(item);
    } else {
      // Provide feedback to the user if they don't have enough money
      console.log(`Not enough money to buy ${item.name}`);
    }
  };

  return (
    <ShopContainer>
      <h2>Pet Shop</h2>
      {shopItems.map((item) => (
        <ShopItem key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => handleBuy(item)}>Buy for ${item.price}</button>
        </ShopItem>
      ))}
    </ShopContainer>
  );
};

export default PetShop;
