import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {
  getAvailableNotifications,
  deleteDeviceId,
} from '../redux/actions/notifications.actions';
import {
  toggleNotification,
  getCurrentUser,
} from '../redux/actions/users.actions';
import LeaveGroupIcon from '../assets/images/LeaveGroupIcon.png';
import LayoutScrollViewWithHeader from '../components/LayoutScrollViewWithHeader';
import { saveInfo } from '../util/helpers';
import SectionCard from '../components/SectionCard';
import SwitchCard from '../components/SwitchCard';
import colors from '../components/Global/colors';
import ActionSheet from '../components/ActionSheet';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

export const StyledContainer = styled.View`
  background-color: ${colors.background};
  align-self: stretch;
  flex: 1;
`;

const StyledSignOutButton = styled.TouchableOpacity`
  margin: 10px;
  width: ${DEVICE_WIDTH - 20};
  align-items: flex-start;
`;

const StyledSignOut = styled.Text`
  color: ${colors.darkNeutral};
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  font-size: 16px;
  letter-spacing: -0.0861539px;
  text-decoration: underline;
`;

const fakeNotificationKeys = {
  comment_reaction: 'When a user likes my comment on a post',
  new_message: 'When I receive a message from a user',
  post_comment: 'When a user comments on my post',
  post_reaction: 'When a user likes my post',
};

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationOptions: [],
      // notificationSettings: this.props.user.notification_names,
      notificationSettings: ['post_reaction', 'new_message'],
      signOutModalVisible: false,
    };
  }

  componentDidMount() {
    // GET LIST AND MAP TO STATE
    // this.props.getAvailableNotifications();

    const output = Object.entries(fakeNotificationKeys).map(([key, value]) => ({
      key,
      value,
    }));
    this.setState({ notificationOptions: output });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.notifications.status !== this.props.notifications.status &&
      this.props.notifications.status.includes('availableComplete')
    ) {
      var output = Object.entries(this.props.notifications.results).map(
        ([key, value]) => ({ key, value }),
      );
      this.setState({ notificationOptions: output });
    }

    if (
      prevProps.user.auth !== this.props.user.auth &&
      this.props.user.auth.includes('toggle')
    ) {
      this.setState({
        notificationSettings: this.props.user.notification_names,
      });
      this.props.getCurrentUser();
    }
  }

  handleLeftHeaderButton = () => {
    this.props.navigation.goBack();
  };

  handleSignOut = () => {
    saveInfo('', '', '');
    this.props.navigation.navigate('SignedOut');
  };

  handleSwitchChange = value => {
    // this.props.toggleNotification(this.props.user, value.key);
  };

  render() {
    return (
      <LayoutScrollViewWithHeader
        hasBar={false}
        headerTitle="Settings"
        canRefresh={false}
      >
        {this.state.signOutModalVisible && <StyledOverlay />}
        <ActionSheet
          modalVisible={this.state.signOutModalVisible}
          closeModal={() => this.setState({ signOutModalVisible: false })}
          title={'Are you sure?'}
          actions={[
            {
              title: 'Sign Out',
              icon: LeaveGroupIcon,
              onPress: () => this.handleSignOut(),
            },
          ]}
        />
        <StyledContainer>
          <SectionCard title="Notification Settings">
            {this.state.notificationOptions.map((value, index) => (
              <SwitchCard
                value={value}
                key={index}
                onPress={() => this.handleSwitchChange(value)}
                currentSettings={this.state.notificationSettings}
              />
            ))}
          </SectionCard>
        </StyledContainer>
        <StyledSignOutButton
          onPress={() => this.setState({ signOutModalVisible: true })}
        >
          <StyledSignOut>Sign Out</StyledSignOut>
        </StyledSignOutButton>
      </LayoutScrollViewWithHeader>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
  user: state.user,
});

export default connect(
  mapStateToProps,
  {
    getAvailableNotifications,
    toggleNotification,
    deleteDeviceId,
    getCurrentUser,
  },
)(SettingsScreen);
