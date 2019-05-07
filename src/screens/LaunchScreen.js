import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import SInfo from 'react-native-sensitive-info';
// import { connect } from 'react-redux';
import styled from 'styled-components/native';
// import { setSelectedTab } from '../redux/actions/tabBar.actions';
// import { signInUser, getCurrentUser } from '../redux/actions/users.actions';
// import { setLoginType } from '../redux/actions/loginType.actions';
// import { getSingleOrganization } from '../redux/actions/organizations.actions';
// import { getAllNotifications } from '../redux/actions/notifications.actions';
// import { getAllConversations } from '../redux/actions/conversations.actions';
// import { getAllGroups } from '../redux/actions/groups.actions';
// import { getAllPosts } from '../redux/actions/posts.actions';
// import { resetStack } from '../util/helpers';
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
    // this.attemptAutoLogin();
    // setTimeout(() => this.watchForHanging(), 8000);
    // saveInfo('', '', '');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('LAUNCH SCREEN PROPS ', prevProps, this.props);
    const { loginType, user } = this.props;
    if (loginType === 'AUTO_LOGIN') {
      if (
        prevProps.user.auth !== user.auth &&
        user.auth.includes('emailAuthComplete')
      ) {
        if (user.organization_ids.length === 0) {
          // User not approved yet
          resetStack(this.props.navigation, 'SignUp', 1000);
        } else {
          // User was logged in, get notifications and organization in state, make call to getCurrentUser (returns different data??)
          this.props.getCurrentUser();
          this.props.getAllConversations();
          this.props.getAllNotifications(user.id);
          this.props.getSingleOrganization(user.organization_ids[0]);
          this.props.getAllGroups();
          this.props.getAllPosts();
        }
      } else if (user.auth === 'failed') {
        resetStack(this.props.navigation, 'SignIn', 1000);
      }
      if (
        prevProps.user.auth !== user.auth &&
        user.auth.includes('getUserComplete')
      ) {
        // when we have current user, navigate to signed in
        this.props.setSelectedTab('MainFeed');
        // resetStack(this.props.navigation, 'MainFeed', 1000);
        this.props.navigation.navigate('SignedIn');
        // setTimeout(() => {
        //   this.props.navigation.navigate('MainFeed');
        // }, 1000);
      }
    }
  }

  attemptAutoLogin = async () => {
    const email = await SInfo.getItem('email', {});
    const password = await SInfo.getItem('password', {});
    // console.log(email, password);
    this.props.signInUser(email, password);
    this.props.setLoginType('AUTO_LOGIN');
  };

  watchForHanging = () => {
    if (this.props.user.auth === 'pending') {
      resetStack(this.props.navigation, 'SignIn', 1000);
    }
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

// const mapStateToProps = state => ({
//   user: state.user,
//   loginType: state.loginType,
// });

// export default connect(
//   mapStateToProps,
//   {
//     // signInUser,
//     // getCurrentUser,
//     // setLoginType,
//     // getSingleOrganization,
//     // getAllNotifications,
//     // getAllConversations,
//     // setSelectedTab,
//     // getAllGroups,
//     // getAllPosts,
//   },
// )(LaunchScreen);

export default LaunchScreen;
