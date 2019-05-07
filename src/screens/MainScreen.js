import React from 'react';
import styled from 'styled-components/native';
import colors from '../components/Global/colors';
import LogoIcon from '../components/LogoIcon';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
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
  align-self: center;
  height: 45;
`;

const StyledLogoView = styled.View`
  margin-right: 10;
`;

function MainScreen() {
  return (
    <StyledView>
      <StyledHeadingView>
        <StyledLogoView>
          <LogoIcon />
        </StyledLogoView>

        <StyledHeadingView>
          <Heading>Welcome!</Heading>
        </StyledHeadingView>
      </StyledHeadingView>
    </StyledView>
  );
}

export default MainScreen;
