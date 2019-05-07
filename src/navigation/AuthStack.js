import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LaunchScreen from '../screens/LaunchScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AuthStack = createStackNavigator(
  {
    Launch: LaunchScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    headerMode: 'none',
    gesturesEnabled: false,
  },
);

export default AuthStack;
