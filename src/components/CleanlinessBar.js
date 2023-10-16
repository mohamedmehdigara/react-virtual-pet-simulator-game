import React from 'react';
import PropTypes from 'prop-types';
import { CleanlinessContainer, CleanlinessLevel } from '../styles';
import styled from 'styled-components';

const StyledCleanlinessText = styled.div`
  font-weight: bold;
  color: #333;
`;

const CleanlinessBar = ({ metricName, cleanliness }) => {
  const getCleanlinessColor = (cleanliness) => {
    if (cleanliness >= 70) {
      return 'green';
    } else if (cleanliness >= 30) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const cleanlinessColor = getCleanlinessColor(cleanliness);

  return (
    <CleanlinessContainer>
      <StyledCleanlinessText>{metricName}:</StyledCleanlinessText>
      <CleanlinessLevel cleanliness={cleanliness} color={cleanlinessColor}>
        {cleanliness}%
      </CleanlinessLevel>
    </CleanlinessContainer>
  );
};

CleanlinessBar.propTypes = {
  metricName: PropTypes.string.isRequired,
  cleanliness: PropTypes.number.isRequired,
};

export default CleanlinessBar;
