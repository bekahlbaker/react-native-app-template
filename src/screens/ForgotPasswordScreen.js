import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import LargeButton from '../components/LargeButton';
import colors from '../components/Global/colors';
import Success from '../assets/images/Success.png';
import { sendPassword } from '../redux/actions/users.actions';
import { StyledInput } from './SignInScreen';
import BackArrow from '../assets/images/BackArrow.png';
import { StyledLeftButton, StyledIcon } from '../components/HeaderDetail';

const DEVICE_WIDTH = Dimensions.get('window').width;
const StyledError = styled.Text`
  color: ${colors.error};
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  margin-top: 20;
`;

const Heading = styled.Text`
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  letter-spacing: -0.0861539px;
  color: ${colors.white};
  margin-top: 75;
  margin-bottom: 60;
`;

const StyledSuccessImage = styled.Image`
  align-self: center;
  margin-top: 50;
`;

const StyledHeader = styled.View`
  width: ${DEVICE_WIDTH};
  height: 120;
  background-color: ${colors.darkerBase};
  justify-content: center;
  padding-left: 10;
`;

const StyledContainer = styled.View`
  background-color: ${colors.primary};
  align-self: stretch;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
`;

const StyledHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -0.0861539px;
  color: ${colors.white};
  margin-top: 23;
`;

class ForgotPasswordScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      error: '',
      emailSent: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user.auth === 'pending' && user.auth === 'complete') {
      this.setState({ emailSent: true });
    } else if (
      user.auth === 'failed' &&
      user.error === 'not found' &&
      prevProps.user.error !== 'not found'
    ) {
      this.handleError('Email not found. Do you need to sign up?');
    }
  }

  handleLeftHeaderButton = () => {
    this.props.navigation.goBack();
  };

  handleError = error => {
    this.setState({ error });
  };

  handleSendPassword = () => {
    this.setState({ error: '' }, () => {
      if (!this.state.email) {
        this.setState({ error: 'Please enter an email' });
      }
      if (this.state.email) {
        this.props.sendPassword(this.state.email);
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: colors.darkerBase }}>
        <StyledContainer>
          <StyledHeader>
            <StyledLeftButton onPress={this.handleLeftHeaderButton}>
              <StyledIcon source={BackArrow} />
            </StyledLeftButton>
            <StyledHeaderTitle>Forgot Your Password?</StyledHeaderTitle>
          </StyledHeader>

          {this.state.emailSent && <StyledSuccessImage source={Success} />}
          <Heading>
            {this.state.emailSent
              ? 'Email sent! Check your email and follow the password reset instructions.'
              : 'Enter your email below to receive your password reset instructions.'}
          </Heading>
          {!this.state.emailSent && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled={Platform.OS === 'ios'}
            >
              <StyledInput
                placeholder="Email"
                errorMessage="Email not found"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholderTextColor={colors.white}
                autoCapitalize="none"
              />
              <LargeButton
                title={this.state.emailSent ? 'Resend' : 'Send Password'}
                background={
                  this.state.email !== '' ? colors.white : colors.lightNeutral
                }
                onPress={this.handleSendPassword}
                color={
                  this.state.email !== ''
                    ? colors.darkerBase
                    : colors.mediumNeutral
                }
                style={{ borderWidth: 0, marginTop: 90 }}
              />
              {this.state.error !== '' && (
                <StyledError>{this.state.error}</StyledError>
              )}
            </KeyboardAvoidingView>
          )}
        </StyledContainer>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { sendPassword },
)(ForgotPasswordScreen);
