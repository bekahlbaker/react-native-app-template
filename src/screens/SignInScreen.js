import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { resetStack, saveInfo } from '../util/helpers';
import { signInUser, getCurrentUser } from '../redux/actions/users.actions';
import { setLoginType } from '../redux/actions/loginType.actions';
import LargeButton from '../components/LargeButton';
import colors from '../components/Global/colors';
import TextButton from '../components/TextButton';
import LogoIcon from '../components/LogoIcon';
import EyeOff from '../assets/images/Eye-Off.png';
import EyeOn from '../assets/images/Eye-On.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

export const StyledError = styled.Text`
  color: ${colors.error};
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
`;

export const Heading = styled.Text`
  font-style: normal;
  font-weight: bold;
  line-height: 45px;
  font-size: 38px;
  letter-spacing: -0.233846px;
  color: ${colors.white};
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BackgroundView = styled.View`
  display: flex;
  flex: 1;
  background-color: ${colors.primary};
`;

export const AuthViewContainer = styled.View`
  display: flex;
  flex: 1;
  align-items: flex-start;
  padding: 25px;
`;

const StyledLogoView = styled.View`
  margin-top: 66;
  margin-bottom: 27;
`;

const StyledHeadingView = styled.View`
  margin-bottom: 60;
`;

const StyledButtonView = styled.View`
  margin-top: 60;
  margin-bottom: 10;
`;

export const StyledBottomTextView = styled.View`
  margin-bottom: 30;
  margin-left: 20;
`;

export const StyledBottomText = styled.Text`
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  color: #d2fbf8;
`;

export const StyledInputWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const StyledIconButton = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  height: 53px;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 50px;
`;

export const StyledViewIcon = styled.Image``;

export const StyledInput = styled.TextInput`
  height: 53px;
  background-color: transparent;
  color: ${colors.white};
  padding-top: 10;
  padding-bottom: 6;
  padding-left: 8;
  margin-top: 8;
  border: 0;
  border-bottom-width: ${props => (props.hasError ? '2px' : '1px')};
  border-bottom-color: ${props =>
    props.hasError ? colors.error : colors.darkerBase};
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.0984616px;
  width: ${DEVICE_WIDTH - 50};
`;

class SignInScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: '',
      emailHasError: false,
      passwordHasError: false,
      loggingIn: false,
      passwordHidden: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { loginType, user, navigation } = this.props;
    // Only handle login type if sign in login
    if (loginType === 'SIGN_IN_LOGIN') {
      if (
        prevProps.user.auth !== user.auth &&
        user.auth.includes('emailAuthComplete')
      ) {
        navigation.navigate('SignedIn');
      } else if (
        prevProps.user.auth !== user.auth &&
        user.hasOwnProperty('error')
      ) {
        this.handleError(user.error);
      }
    }
  }

  handleError = error => {
    this.setState({ error, loggingIn: false });
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  handleSignIn = () => {
    Keyboard.dismiss();
    this.setState(
      {
        loggingIn: true,
        error: '',
        passwordHasError: false,
        emailHasError: false,
      },
      () => {
        if (!this.state.password) {
          this.setState({
            error: 'Please enter a password',
            passwordHasError: true,
            loggingIn: false,
          });
        }
        if (!this.state.email) {
          this.setState({
            error: 'Please enter an email',
            emailHasError: true,
            loggingIn: false,
          });
        }
        if (this.state.email && this.state.password) {
          saveInfo('token', this.state.password, this.state.email, '0');
          this.props.navigation.navigate('SignedIn');

          // // console.log('You can log in!');
          // this.props.signInUser(this.state.email, this.state.password);
          // this.props.setLoginType('SIGN_IN_LOGIN');
        }
      },
    );
  };

  render() {
    return (
      <BackgroundView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          enabled={Platform.OS === 'ios'}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            style={{
              backgroundColor: 'transparent',
            }}
            shouldPersistTaps="always"
            keyboardShouldPersistTaps="always"
          >
            <AuthViewContainer>
              <StyledLogoView>
                <LogoIcon size={72} />
              </StyledLogoView>

              <StyledHeadingView>
                <Heading>RN</Heading>
                <Heading>Template</Heading>
              </StyledHeadingView>

              <StyledInput
                placeholder="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCapitalize="none"
                placeholderTextColor={colors.white}
                hasError={this.state.emailHasError}
              />

              <StyledInputWrapper>
                <StyledInput
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={this.state.passwordHidden}
                  autoCapitalize="none"
                  placeholderTextColor={colors.white}
                  hasError={this.state.passwordHasError}
                />
                <StyledIconButton
                  onPress={() =>
                    this.setState({
                      passwordHidden: !this.state.passwordHidden,
                    })
                  }
                >
                  <StyledViewIcon
                    source={this.state.passwordHidden ? EyeOff : EyeOn}
                  />
                </StyledIconButton>
              </StyledInputWrapper>

              <ActivityIndicator
                size="large"
                color={colors.white}
                style={{ marginTop: 30, alignSelf: 'center' }}
                hidesWhenStopped
                animating={this.state.loggingIn}
              />

              <StyledButtonView>
                <LargeButton
                  title="Sign In"
                  background="#fff"
                  onPress={this.handleSignIn}
                  color={colors.darkerBase}
                />
              </StyledButtonView>

              <TextButton
                textColor="#fff"
                onPress={() => this.handleForgotPassword()}
              >
                Forgot Password?
              </TextButton>

              {this.state.error !== '' && (
                <StyledError>{this.state.error}</StyledError>
              )}
            </AuthViewContainer>
          </ScrollView>
        </KeyboardAvoidingView>
        <StyledBottomTextView>
          <Row>
            <StyledBottomText>Don't have an account yet? </StyledBottomText>
            <TextButton
              onPress={() => resetStack(this.props.navigation, 'SignUp')}
            >
              Sign Up Here
            </TextButton>
          </Row>
        </StyledBottomTextView>
      </BackgroundView>
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
    getCurrentUser,
    setLoginType,
  },
)(SignInScreen);
