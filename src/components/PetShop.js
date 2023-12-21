// PetShop.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ShopContainer = styled.div`
  /* Add any styling for the shop container */
`;

const ShopItem = styled.div`
  /* Add any styling for individual shop items */
  margin-bottom: 10px;
`;

const PetShop = ({ onBuy }) => {
  // Define your shop items and their prices
  const shopItems = [
    { id: 1, name: 'Toy', price: 10 },
    { id: 2, name: 'Food', price: 5 },
    { id: 3, name: 'Accessory', price: 15 },
  ];

  const handleBuy = (item) => {
    // Implement your logic for buying items
    // You can deduct money or perform other actions here
    onBuy(item);
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
