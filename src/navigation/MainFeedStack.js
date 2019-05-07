import { createStackNavigator } from 'react-navigation';
import MainFeedScreen from '../screens/MainFeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostShow from '../screens/PostShowScreen';
import CreateGroupScreen from '../screens/CreateGroup';
import InviteUsersScreen from '../screens/InviteUsersScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupShowScreen from '../screens/GroupShowScreen';

const MainFeedStack = createStackNavigator(
  {
    MainFeed: MainFeedScreen,
    CreatePost: CreatePostScreen,
    PostDetail: PostShow,
    CreateGroup: CreateGroupScreen,
    InviteUsers: InviteUsersScreen,
    Groups: GroupsScreen,
    GroupDetail: GroupShowScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  }
);

export default MainFeedStack;
