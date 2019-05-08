import React from 'react';
import { Platform, View } from 'react-native';
import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';

import styled from 'styled-components/native';
import HomeIcon from '../assets/images/HomeIcon.png';
import HomeIconFilled from '../assets/images/HomeIconFilled.png';
// import MessageIcon from '../assets/images/MessageIcon.png';
// import MessageIconFilled from '../assets/images/MessageIconFilled.png';
// import NotificationIcon from '../assets/images/NotificationIcon.png';
// import NotificationIconFilled from '../assets/images/NotificationIconFilled.png';
import MoreIcon from '../assets/images/MoreIcon.png';
import MoreIconFilled from '../assets/images/MoreIconFilled.png';

import MainScreen from '../screens/MainScreen';

import SettingsStack from './SettingsStack';

import colors from '../components/Global/colors';

// import NotificationIndicator from '../PushNotifications/NotificationIndicator';
// import MessageIndicator from '../PushNotifications/MessageIndicator';

const StyledIcon = styled.Image`
  height: ${props => props.height};
  width: ${props => props.width};
`;

const TabNavigator = createBottomTabNavigator(
  {
    MainFeedTab: {
      screen: MainScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <StyledIcon
            height={22}
            width={22}
            source={focused ? HomeIconFilled : HomeIcon}
          />
        ),
      },
    },
    // MessagesTab: {
    //   screen: MessagesStack,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <View style={{ flexDirection: 'row' }}>
    //         <MessageIndicator />
    //         <StyledIcon
    //           height={17}
    //           width={26}
    //           source={focused ? MessageIconFilled : MessageIcon}
    //         />
    //       </View>
    //     ),
    //   },
    // },
    // NotificationsTab: {
    //   screen: NotificationsScreen,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor, focused }) => (
    //       <View style={{ flexDirection: 'row' }}>
    //         <NotificationIndicator />
    //         <StyledIcon
    //           height={26}
    //           width={19}
    //           source={focused ? NotificationIconFilled : NotificationIcon}
    //         />
    //       </View>
    //     ),
    //   },
    // },
    MoreTab: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <StyledIcon
            height={9}
            width={36}
            source={focused ? MoreIconFilled : MoreIcon}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.primary,
      inactiveTintColor: 'gray',
    },
    tabBarComponent: Platform.OS === 'ios' ? TabBarBottom : TabBarAndroid,
    tabBarPosition: 'bottom',
  },
);

export default TabNavigator;
