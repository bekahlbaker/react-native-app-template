import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.backgroundColor};
  padding: 0 12px;
  color: black;
  padding-left: 8;
  border-radius: 8;
  width: ${props => props.width};
`;

const StyledInput = styled.TextInput`
  padding-left: 8;
  color: ${props => props.inputColor};
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.0738462px;
  flex: 1;
`;

export default (SearchBar = props => (
  <StyledView width={props.width} backgroundColor={props.backgroundColor}>
    <StyledInput
      inputColor={props.inputColor}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      placeholderTextColor={props.placeholderTextColor}
    />
    <Ionicons name="ios-search" size={20} color={props.inputColor} />
  </StyledView>
));
