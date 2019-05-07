import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';

const MainSwitchNavigator = createSwitchNavigator({
  SignedOut: AuthStack,
  SignedIn: TabNavigator,
});

export default createAppContainer(MainSwitchNavigator);
