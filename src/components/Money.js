// Money.js
import React from 'react';
import styled from 'styled-components';

// Styled component for displaying money
const MoneyContainer = styled.div`
  /* Add any styling for the money container */
  margin-top: 10px;
`;

const Money = ({ money }) => {
  return (
    <MoneyContainer>
      <strong>Money:</strong> ${money}
    </MoneyContainer>
  );
};

export default Money;
