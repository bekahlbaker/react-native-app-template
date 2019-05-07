import { createStackNavigator } from 'react-navigation';
import MessagesScreen from '../screens/MessagesScreen';
import MessagesShowScreen from '../screens/MessageShowScreen';
import CreateMessageScreen from '../screens/CreateMessageScreen';

const MainFeedStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    MessageDetail: MessagesShowScreen,
    CreateMessage: CreateMessageScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export default MainFeedStack;
