import React, { Component } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { resetStack, saveInfo } from '../util/helpers';
import { createUser } from '../redux/actions/users.actions';
import { setLoginType } from '../redux/actions/loginType.actions';
import LargeButton from '../components/LargeButton';
import colors from '../components/Global/colors';
import {
  BackgroundView,
  AuthViewContainer,
  Row,
  StyledBottomText,
  StyledBottomTextView,
  StyledInput,
  StyledError,
  StyledInputWrapper,
  StyledViewIcon,
  StyledIconButton,
} from './SignInScreen';
import TextButton from '../components/TextButton';
import LogoIcon from '../components/LogoIcon';
import EyeOff from '../assets/images/Eye-Off.png';
import EyeOn from '../assets/images/Eye-On.png';

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
  margin-top: 60;
  margin-bottom: 60;
  align-self: center;
  height: 45;
`;

const StyledLogoView = styled.View`
  margin-right: 10;
`;

const StyledButtonView = styled.View`
  margin-top: 60;
  margin-bottom: 20;
`;

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      firstNameHasError: false,
      lastName: '',
      lastNameHasError: false,
      email: '',
      emailHasError: false,
      password: '',
      passwordHasError: false,
      confirmPassword: '',
      confirmPasswordHasError: false,
      error: '',
      passwordHidden: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { loginType, user, navigation } = this.props;
    // Only handle if login type is sign up
    if (loginType === 'SIGN_UP_LOGIN') {
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
    this.setState({ error });
  };

  validateString = value => {
    const str = value.replace(/\s/g, '');
    if (str !== null && str !== '') {
      return true;
    }
    return false;
  };

  validateEmail = email => {
    if (
      email !== null &&
      email !== '' &&
      email.includes('@') &&
      email.includes('.')
    ) {
      return true;
    }
    return false;
  };

  validatePassword = password => {
    if (password !== null && password !== '' && password.length >= 6) {
      return true;
    }
    return false;
  };

  handleSignUp = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;
    Keyboard.dismiss();
    this.setState(
      {
        error: '',
        firstNameHasError: false,
        lastNameHasError: false,
        emailHasError: false,
        passwordHasError: false,
        confirmPasswordHasError: false,
      },
      () => {
        if (!this.validateString(firstName)) {
          this.setState({
            error: 'Please enter a first name',
            firstNameHasError: true,
          });
        }
        if (!this.validateString(lastName)) {
          this.setState({
            error: 'Please enter a last name',
            lastNameHasError: true,
          });
        }
        if (!this.validateEmail(email)) {
          this.setState({
            error: 'Please enter an email',
            emailHasError: true,
          });
        }
        if (
          !this.validatePassword(confirmPassword) ||
          password !== confirmPassword
        ) {
          this.setState({
            error: 'Please make sure passwords match',
            confirmPasswordHasError: true,
          });
        }
        if (!this.validatePassword(password)) {
          this.setState({
            error: 'Password must be at least 6 characters',
            passwordHasError: true,
          });
        }
        if (
          this.validateString(firstName) &&
          this.validateString(lastName) &&
          this.validateEmail(email) &&
          this.validatePassword(password)
        ) {
          saveInfo('token', this.state.password, this.state.email, '0');
          this.props.navigation.navigate('SignedIn');
          // // console.log('You can log in!');
          // const credentials = {
          //   first_name: firstName,
          //   last_name: lastName,
          //   email,
          //   password,
          // };
          // this.props.createUser(credentials);
          // this.props.setLoginType('SIGN_UP_LOGIN');
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
              <StyledHeadingView>
                <StyledLogoView>
                  <LogoIcon size={45} />
                </StyledLogoView>

                <StyledHeadingView>
                  <Heading>RNTemplate</Heading>
                </StyledHeadingView>
              </StyledHeadingView>

              <StyledInput
                placeholder="First Name"
                value={this.state.firstName}
                onChangeText={firstName => this.setState({ firstName })}
                placeholderTextColor={colors.white}
                autoCapitalize="none"
                hasError={this.state.firstNameHasError}
              />
              <StyledInput
                placeholder="Last Name"
                value={this.state.lastName}
                onChangeText={lastName => this.setState({ lastName })}
                placeholderTextColor={colors.white}
                autoCapitalize="none"
                hasError={this.state.lastNameHasError}
              />
              <StyledInput
                placeholder="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholderTextColor={colors.white}
                autoCapitalize="none"
                hasError={this.state.emailHasError}
              />
              <StyledInputWrapper>
                <StyledInput
                  placeholder="Password"
                  secureTextEntry={this.state.passwordHidden}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  placeholderTextColor={colors.white}
                  autoCapitalize="none"
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

              <StyledInput
                placeholder="Confirm Password"
                secureTextEntry={this.state.passwordHidden}
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
                placeholderTextColor={colors.white}
                autoCapitalize="none"
                hasError={this.state.confirmPasswordHasError}
              />
              <StyledButtonView>
                <LargeButton
                  title="Sign Up"
                  background={colors.white}
                  color={colors.darkerBase}
                  onPress={() => this.handleSignUp()}
                />
              </StyledButtonView>
              {this.state.error !== '' && (
                <StyledError>{this.state.error}</StyledError>
              )}
            </AuthViewContainer>
          </ScrollView>
        </KeyboardAvoidingView>

        <StyledBottomTextView>
          <Row>
            <StyledBottomText>Already have an account? </StyledBottomText>
            <TextButton
              onPress={() => resetStack(this.props.navigation, 'SignIn')}
            >
              Sign In Here
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
  { createUser, setLoginType },
)(SignUpScreen);
