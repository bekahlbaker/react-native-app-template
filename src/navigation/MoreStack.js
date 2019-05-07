import { createStackNavigator } from 'react-navigation';
import MoreScreen from '../screens/MoreScreen';
import InviteUsersScreen from '../screens/InviteUsersScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupShowScreen from '../screens/GroupShowScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourcesShowScreen from '../screens/ResourcesShowScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import InviteToAppScreen from '../screens/InviteToAppScreen';
import AuthStack from './AuthStack';

const MoreStack = createStackNavigator(
  {
    More: MoreScreen,
    Resources: ResourcesScreen,
    ResourcesShow: ResourcesShowScreen,
    InviteUsers: InviteUsersScreen,
    Groups: GroupsScreen,
    GroupDetail: GroupShowScreen,
    Settings: SettingsScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    InviteToApp: InviteToAppScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export default MoreStack;
