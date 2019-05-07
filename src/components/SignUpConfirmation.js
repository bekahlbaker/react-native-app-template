import React from 'react';
import styled from 'styled-components/native';
import colors from './Global/colors';
import Success from '../assets/images/Success.png';
import LogoIcon from './LogoIcon';

const BackgroundView = styled.View`
  background-color: ${colors.primary};
  align-items: center;
  margin-bottom: 50;
`;

const StyledSuccessImage = styled.Image`
  align-self: center;
  margin-top: 30;
  margin-bottom: 40;
`;

const Heading = styled.Text`
  font-style: normal;
  font-weight: bold;
  line-height: 45px;
  font-size: 34px;
  letter-spacing: -0.233846px;
  color: ${colors.white};
`;

const StyledHeadingView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 80;
  margin-bottom: 60;
  align-self: center;
  height: 45;
`;

const StyledLogoView = styled.View`
  margin-right: 10;
`;

const StyledDescription = styled.Text`
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  letter-spacing: -0.0861539px;
  color: ${colors.white};
  margin-left: 20;
  margin-right: 20;
  text-align: center;
`;

export default (SignUpConfirmation = ({ name }) => {
  return (
    <BackgroundView>
      <StyledHeadingView>
        <StyledLogoView>
          <LogoIcon size={45} />
        </StyledLogoView>

        <StyledHeadingView>
          <Heading>RNTemplate</Heading>
        </StyledHeadingView>
      </StyledHeadingView>
      <StyledSuccessImage source={Success} />
      <StyledDescription>
        {`We have received your request to join ${name ||
          'your selected organization'}. The organization admin will review your request and make sure you belong to this organization.\n\n Sit tight and keep an eye on that inbox. We'll notify you when you have been confirmed!`}
      </StyledDescription>
    </BackgroundView>
  );
});
