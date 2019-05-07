import { combineReducers } from 'redux';
import categories from './categories.reducer';
import conversations from './conversations.reducer';
import groups from './groups.reducer';
import loginType from './loginType.reducer';
import messageIndicator from './messageIndicator.reducer';
import notifications from './notifications.reducer';
import notificationIndicator from './notificationIndicator.reducer';
import organizations from './organizations.reducer';
import otherUsers from './otherUsers.reducer';
import posts from './posts.reducer';
import resources from './resources.reducer';
import tabBar from './tabBar.reducer';
import singlePost from './singlePost.reducer';
import user from './users.reducer';

const rootReducer = combineReducers({
  categories,
  conversations,
  groups,
  loginType,
  messageIndicator,
  notifications,
  notificationIndicator,
  organizations,
  otherUsers,
  posts,
  resources,
  tabBar,
  singlePost,
  user,
});

export default rootReducer;
