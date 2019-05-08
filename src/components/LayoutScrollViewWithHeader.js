import React from 'react';
import { Dimensions, Platform, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Header from './Header';
import colors from './Global/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
`;

const StyledScrollView = styled.ScrollView`
  padding-bottom: 30;
`;

const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

/*
View for Screen with scrolling content
With sticky header outside scroll
If there are textfields on the screen, use LayoutKeyboardAvoidingView
*/

const LayoutScrollView = props => (
  <StyledSafeAreaView>
    {props.overlay && <StyledOverlay />}
    <Header
      hasBar={props.hasBar}
      width={props.width}
      backgroundColor={props.backgroundColor}
      inputColor={props.inputColor}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      headerTitle={props.headerTitle}
      leftHeaderIcon={props.leftHeaderIcon}
      leftHeaderButtonTitle={props.leftHeaderButtonTitle}
      rightHeaderIcon={props.rightHeaderIcon}
      rightHeaderButtonTitle={props.rightHeaderButtonTitle}
      leftHeaderButtonAction={props.leftHeaderButtonAction}
      rightHeaderButtonAction={props.rightHeaderButtonAction}
    />
    <StyledScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingBottom: Platform.OS === 'android' ? 60 : 50,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      shouldPersistTaps="always"
      keyboardShouldPersistTaps="always"
      ref={props.myRef}
      refreshControl={
        props.canRefresh && (
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={() => props.onRefresh()}
          />
        )
      }
    >
      {props.children}
    </StyledScrollView>
  </StyledSafeAreaView>
);

export default LayoutScrollView;
