import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const MoreStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    Settings: SettingsScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export default MoreStack;
