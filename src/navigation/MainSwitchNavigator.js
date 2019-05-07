import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthStack from './AuthStack';
// import TabNavigator from './TabNavigator';
import MainScreen from '../screens/MainScreen';

const MainSwitchNavigator = createSwitchNavigator({
  SignedOut: AuthStack,
  // SignedIn: TabNavigator,
  SignedIn: MainScreen,
});

export default createAppContainer(MainSwitchNavigator);
