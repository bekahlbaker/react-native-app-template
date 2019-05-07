import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { getSinglePost } from '../redux/actions/posts.actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LayoutScrollViewWithHeader from '../components/Layouts/LayoutScrollViewWithHeader';
import Avatar from '../components/Avatar';
import SpacingView from '../components/SpacingView';
import Label from '../components/Label';
import MyGroupsCard from '../components/More/MyGroupsCard';
import colors from '../components/Global/colors';
import AboutCard from '../components/More/AboutCard';
import RecentActivityCard from '../components/More/RecentActivityCard';
import SectionCard from '../components/More/SectionCard';
import SettingsIcon from '../assets/images/SettingsIcon.png';
import BackArrow from '../assets/images/BackArrow.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

const StyledColumnView = styled.View`
  flex-direction: column;
  margin-left: 10;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 15;
  padding-bottom: 15;
`;

const StyledName = styled.Text`
  color: ${colors.black};
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -0.0738462px;
  margin-bottom: 8;
`;

const StyledOrganization = styled.Text`
  color: ${colors.mediumNeutral};
  font-family: OpenSans-Regular;
  font-weight: 600;
  line-height: 16px;
  font-size: 12px;
  letter-spacing: -0.0861539px;
`;

const StyledInfoView = styled.View``;

const StyledText = styled.Text`
  align-self: flex-start;
  margin-top: 6;
`;

const StyledButton = styled.TouchableOpacity`
  height: 35;
  display: flex;
  margin-left: -10;
  justify-content: center;
  background-color: ${colors.primary};
`;

const StyledButtonText = styled.Text`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  font-size: 12px;
  text-align: center;
  letter-spacing: -0.0861539px;
  color: ${colors.white};
`;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.state.params.user,
      recentActivity: [],
      usersGroups: [],
    };
  }

  componentDidMount() {
    this.determineGroupsOfUser();
    // console.log('PROFILE PROPS ', this.props);
    this.determineRecentActivity();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('PROFILE ', prevProps, this.props);
    if (
      prevProps.user.auth !== this.props.user.auth &&
      this.props.user.auth.includes('update')
    ) {
      this.setState({ user: this.props.user }, () =>
        this.props.navigation.goBack(),
      );
    }
    // Watch for incoming updates and send to detail with that post or conversation
    if (
      prevProps.posts.status !== this.props.posts.status &&
      this.props.posts.status.includes('singleComplete')
    ) {
      this.props.navigation.navigate('PostDetail', {
        post: this.props.posts.results,
        isCommenting: false,
        replacePost: () => console.log('replace post param'),
        shouldGoBackToIndex: false,
        shouldGoBackToNotifications: false,
        shouldGoBackToProfile: true,
      });
    }
  }

  handleLeftHeaderButton = () => {
    // console.log('Did Touch Left Button');
    this.props.navigation.goBack();
  };

  handleRightHeaderButton = () => {
    // console.log('Did Touch Right Button');
    this.props.navigation.navigate('EditProfile', { user: this.props.user });
  };

  handleFirstLargeButton = () => {
    // If current user, Edit
    if (this.state.user.id === this.props.user.id) {
      this.handleRightHeaderButton();
    } else {
      // If not, Send Message
      this.props.navigation.navigate('CreateMessage', {
        user: this.state.user,
      });
    }
  };

  handleSecondLargeButton = () => {
    // If current user, see all groups
    if (this.state.user.id === this.props.user.id) {
      this.handleShowAllGroups();
    } else {
      // If not, invite single user to a group
      this.props.navigation.navigate('InviteUsers', {
        isNewGroup: false,
        group: null,
        userToInvite: this.state.user,
      });
    }
  };

  determineRecentActivity = () => {
    // Filter out posts made by user
    const filteredPosts = this.props.posts.results.filter(
      el => el.user_id === this.props.user.id,
    );
    // console.log(filteredPosts);
    // Filter out comments on all posts by user
    const postsWithComments = this.props.posts.results.filter(
      el => el.comments.length > 0,
    );
    // console.log(postsWithComments);
    const commentsByUser = postsWithComments.map(post => {
      const comments = post.comments.filter(
        el => el.user.id === this.props.user.id,
      );
      return comments.length > 0 ? post : null;
    });

    // Merge into array
    const recentActivity = [...new Set([...filteredPosts, ...commentsByUser])]
      .filter(el => el !== null)
      .slice(0)
      .slice(-6);
    // console.log(recentActivity);

    this.setState({ recentActivity });
    //Display by "You posted...." and "You commented...."
  };

  determineGroupsOfUser = () => {
    const usersGroups = [];
    this.props.groups.results.map(group => {
      // console.log('EDITING GROUP ', this.props.editingGroup);
      // console.log('FILTERING GROUPS ', group);
      const active = group.users.filter(item => item.id === this.state.user.id);
      if (active.length > 0 && group.active) {
        usersGroups.push(group);
      }
    });
    this.setState({ usersGroups });
  };

  handleShowAllGroups = () => {
    this.props.navigation.navigate('Groups');
  };

  handleInviteUserToGroup = () => {};

  verifyContent = val => {
    if (val !== null && val !== 'null' && val !== '') {
      // console.log('VAL NOT NULL OR STRING OF NULL', val);
      return true;
    } else {
      // console.log('VAL IS NULL OR STRING OF NULL', val);
      return false;
    }
  };

  render() {
    const {
      id,
      first_name,
      last_name,
      full_name,
      avatar_url,
      created_at,
      date_of_birth,
      gender,
      city,
      state,
      zip,
    } = this.state.user;
    // console.log(this.state.user);
    const { name } = this.props.organizations.results;
    // Get age
    const age = date_of_birth ? moment().diff(date_of_birth, 'years') : null;
    // Create location array
    const locArr = [city, state, zip];
    var location = locArr
      .filter(loc => {
        return this.verifyContent(loc);
      })
      .join(', ');
    // Create gender, age array
    const ageGenArr = [gender, age];
    var ageGen = ageGenArr
      .filter(item => {
        return this.verifyContent(item);
      })
      .join(', ');
    // console.log('AGE GEN ARR ', ageGenArr);
    // console.log('LOCA ARR ', locArr);
    const infoArr = [ageGen, location];
    // console.log('INFO ARR ', infoArr);
    return (
      <LayoutScrollViewWithHeader
        headerTitle="Profile"
        leftHeaderIcon={BackArrow}
        leftHeaderButtonAction={this.handleLeftHeaderButton}
        canRefresh={false}
      >
        <SectionCard>
          <StyledRowView>
            <Avatar
              source={{
                uri: avatar_url,
              }}
              size={70}
              firstName={first_name}
              lastName={last_name}
              onSelectUser={() => console.log('selected user')}
            />
            <StyledColumnView>
              <StyledName>{full_name}</StyledName>
              <StyledOrganization>{name}</StyledOrganization>
              <StyledOrganization>
                {`Member Since ${created_at.substring(0, 4)}`}
              </StyledOrganization>
            </StyledColumnView>
          </StyledRowView>
          <StyledButton onPress={() => this.handleFirstLargeButton()}>
            <StyledButtonText>
              {id === this.props.user.id
                ? 'Edit My Profile'
                : `Send ${full_name} A Message`}
            </StyledButtonText>
          </StyledButton>
        </SectionCard>

        <SectionCard>
          <Label
            text={`About ${id === this.props.user.id ? `you` : full_name}`}
          />
          <StyledInfoView>
            <AboutCard info={infoArr} />
          </StyledInfoView>
        </SectionCard>

        <SectionCard>
          <Label
            text={
              id === this.props.user.id
                ? `Your Groups at ${name}`
                : `Their Groups at ${name}`
            }
          />
          <MyGroupsCard
            groups={this.state.usersGroups}
            onPressMoreGroups={() => console.log('')}
            shouldShowMoreGroups={false}
            currentUser={this.props.user}
          />
          <StyledButton onPress={() => this.handleSecondLargeButton()}>
            <StyledButtonText>
              {id === this.props.user.id
                ? 'Browse more groups'
                : `Invite ${full_name} to a group...`}
            </StyledButtonText>
          </StyledButton>
        </SectionCard>

        {this.state.user.id === this.props.user.id && (
          <SectionCard>
            <Label text="Recent Activity" />
            <RecentActivityCard
              activities={this.state.recentActivity}
              onPress={item => this.props.getSinglePost(item.id)}
              userId={this.props.user.id}
            />
          </SectionCard>
        )}
      </LayoutScrollViewWithHeader>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups,
  organizations: state.organizations,
  posts: state.posts,
  resources: state.resources,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getSinglePost },
)(ProfileScreen);
