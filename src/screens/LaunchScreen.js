import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { signInUser } from '../redux/actions/users.actions';
import { setLoginType } from '../redux/actions/loginType.actions';
import { resetStack } from '../util/helpers';
import colors from '../components/Global/colors';
import LogoIcon from '../components/LogoIcon';

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;

const Heading = styled.Text`
  font-style: normal;
  font-weight: bold;
  line-height: 45px;
  font-size: 34px;
  letter-spacing: -0.233846px;
  color: ${colors.white};
`;

const StyledHeadingView = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  height: 45;
`;

const StyledLogoView = styled.View`
  margin-right: 10;
`;

class LaunchScreen extends Component {
  componentDidMount() {
    this.attemptAutoLogin();
  }

  componentDidUpdate(prevProps) {
    const { loginType, user, navigation } = this.props;
    // Only handle login from here if login type is auto login
    if (loginType === 'AUTO_LOGIN') {
      // If the user auth property comes back as successfull, send to Signed In
      // Or send to the Sign In screen
      if (
        prevProps.user.auth !== user.auth &&
        user.auth.includes('emailAuthComplete')
      ) {
        navigation.navigate('SignedIn');
      } else if (user.auth === 'failed') {
        resetStack(navigation, 'SignIn', 1000);
      }
    }
  }

  attemptAutoLogin = async () => {
    // Get saved information and send to signInUser endpoint
    const email = await SInfo.getItem('email', {});
    const password = await SInfo.getItem('password', {});

    if (email && password) {
      // To simulate successfull login
      setTimeout(() => this.props.navigation.navigate('SignedIn'), 2000);
    } else {
      // To simulate failed login
      resetStack(this.props.navigation, 'SignIn', 2000);
    }

    // this.props.signInUser(email, password);

    // // Set login type of auto login
    // this.props.setLoginType('AUTO_LOGIN');
  };

  render() {
    return (
      <StyledView>
        <StyledHeadingView>
          <StyledLogoView>
            <LogoIcon />
          </StyledLogoView>

          <StyledHeadingView>
            <Heading>RNTemplate</Heading>
          </StyledHeadingView>
        </StyledHeadingView>
        <ActivityIndicator
          size="large"
          color={colors.white}
          style={{ marginTop: 20 }}
        />
      </StyledView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  loginType: state.loginType,
});

export default connect(
  mapStateToProps,
  {
    signInUser,
    setLoginType,
  },
)(LaunchScreen);
