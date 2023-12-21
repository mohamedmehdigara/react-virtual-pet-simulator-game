// SocialMeter.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Import only the necessary styled component from your styles.js file
import { SocialMeterContainer, SocialMeterLevel } from '../styles';

// Styled component for the SocialMeter, directly extending SocialMeterContainer
const StyledSocialMeter = styled(SocialMeterContainer)`
  /* You can adjust any additional styling specific to SocialMeter here */
  /* For example, you can add margin, padding, or other CSS properties */
`;

// Styled component for the social meter level (no need for a separate styled component)
const StyledSocialMeterLevel = styled(SocialMeterLevel)`
  font-weight: bold;
  color: var(--social-meter-text-color); // Text color for the social meter level
`;

const SocialMeter = ({ socialLevel }) => {
  // Determine the social meter color based on the social level
  const socialColor =
    socialLevel >= 70
      ? 'var(--social-meter-green)'
      : socialLevel >= 30
      ? 'var(--social-meter-orange)'
      : 'var(--social-meter-red)';

  return (
    <StyledSocialMeter>
      <StyledSocialMeterLevel color={socialColor}>{socialLevel}</StyledSocialMeterLevel>
    </StyledSocialMeter>
  );
};

// PropTypes for socialLevel
SocialMeter.propTypes = {
  socialLevel: PropTypes.number.isRequired,
};

export default SocialMeter;
