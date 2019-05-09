import { createStackNavigator } from 'react-navigation';
import MainFeedScreen from '../screens/MainFeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostShow from '../screens/PostShowScreen';

const MainFeedStack = createStackNavigator(
  {
    MainFeed: MainFeedScreen,
    CreatePost: CreatePostScreen,
    PostDetail: PostShow,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export default MainFeedStack;
