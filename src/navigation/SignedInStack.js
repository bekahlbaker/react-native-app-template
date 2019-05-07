import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainFeedScreen from '../screens/MainFeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostShow from '../screens/PostShowScreen';
import CreateGroupScreen from '../screens/CreateGroup';
import InviteUsersScreen from '../screens/InviteUsersScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupShowScreen from '../screens/GroupShowScreen';

import MessagesScreen from '../screens/MessagesScreen';
import MessagesShowScreen from '../screens/MessageShowScreen';
import CreateMessageScreen from '../screens/CreateMessageScreen';

import MoreScreen from '../screens/MoreScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourcesShowScreen from '../screens/ResourcesShowScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import InviteToAppScreen from '../screens/InviteToAppScreen';

import NotificationsScreen from '../screens/NotificationsScreen';

const SignedInStack = createStackNavigator(
  {
    Notifications: NotificationsScreen,

    MainFeed: MainFeedScreen,
    CreatePost: CreatePostScreen,
    PostDetail: PostShow,
    CreateGroup: CreateGroupScreen,
    InviteUsers: InviteUsersScreen,
    Groups: GroupsScreen,
    GroupDetail: GroupShowScreen,

    Messages: MessagesScreen,
    MessageDetail: MessagesShowScreen,
    CreateMessage: CreateMessageScreen,

    More: MoreScreen,
    Resources: ResourcesScreen,
    ResourcesShow: ResourcesShowScreen,
    Settings: SettingsScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    InviteToApp: InviteToAppScreen,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      gesturesEnabled: false,
    },
  },
);

export default SignedInStack;
