// Inventory.js
import React from 'react';
import styled from 'styled-components';

// Styled component for displaying inventory items
const InventoryContainer = styled.div`
  /* Add any styling for the inventory container */
  margin-top: 20px;
`;

const InventoryItem = styled.div`
  /* Add any styling for individual inventory items */
  margin-bottom: 10px;
`;

const Inventory = ({ items }) => {
  return (
    <InventoryContainer>
      <h2>Inventory</h2>
      {items.length === 0 ? (
        <p>No items in the inventory</p>
      ) : (
        items.map((item, index) => (
          <InventoryItem key={index}>
            <span>{item.name}</span>
            {/* You can add more details about the item if needed */}
          </InventoryItem>
        ))
      )}
    </InventoryContainer>
  );
};

export default Inventory;
