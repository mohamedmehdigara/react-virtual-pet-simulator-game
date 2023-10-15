// src/styles.js
import styled from 'styled-components';

export const PetContainer = styled.div`
  text-align: center;
`;

export const PetImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${(props) => (props.happiness > 50 ? 'green' : 'red')};
  border-radius: 50%;
  margin: 0 auto;
`;

export const PetButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

export const EnergyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EnergyLevel = styled.div`
  background-color: #f39c12;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  color: white;
  padding: 5px;
  font-weight: bold;
  ${({ energy }) => `width: ${energy}%`};
`;

export const CleanlinessContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CleanlinessLevel = styled.div`
  background-color: #e74c3c;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  color: white;
  padding: 5px;
  font-weight: bold;
  ${({ cleanliness }) => `width: ${cleanliness}%`};
`;
