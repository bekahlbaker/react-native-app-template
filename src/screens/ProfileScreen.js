import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import LayoutScrollViewWithHeader from '../components/LayoutScrollViewWithHeader';
import Avatar from '../components/Avatar';
import Label from '../components/Label';
import colors from '../components/Global/colors';
import AboutCard from '../components/AboutCard';
import SectionCard from '../components/SectionCard';

import SettingsScreen from './SettingsScreen';

const fakeUser = {
  id: 124,
  first_name: 'Bekah',
  last_name: 'Baker',
  full_name: 'Bekah Baker',
  avatar_url: 'https://unsplash.com/photos/Wx2AjoLtpcU',
  date_of_birth: '1/15/1987',
  gender: 'female',
  city: 'McKinney',
  state: 'TX',
  zip: '75071',
};

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
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -0.0738462px;
  margin-bottom: 8;
`;

const StyledOrganization = styled.Text`
  color: ${colors.mediumNeutral};
  font-weight: 600;
  line-height: 16px;
  font-size: 12px;
  letter-spacing: -0.0861539px;
`;

const StyledInfoView = styled.View``;

const StyledButton = styled.TouchableOpacity`
  height: 35;
  display: flex;
  margin-left: -10;
  justify-content: center;
  background-color: ${colors.primary};
`;

const StyledButtonText = styled.Text`
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
      user: fakeUser,
    };
  }

  handleFirstLargeButton = () => {
    this.props.navigation.navigate('EditProfile', { user: this.state.user });
  };

  verifyContent = val => {
    if (val !== null && val !== 'null' && val !== '') {
      return true;
    }
    return false;
  };

  createInfoArray = (date_of_birth, city, state, zip, gender) => {
    // Get age
    const age = date_of_birth ? moment().diff(date_of_birth, 'years') : null;
    // Create location array
    const locArr = [city, state, zip];
    const location = locArr
      .filter(loc => {
        return this.verifyContent(loc);
      })
      .join(', ');
    // Create gender, age array
    const ageGenArr = [gender, age];
    const ageGen = ageGenArr
      .filter(item => {
        return this.verifyContent(item);
      })
      .join(', ');
    return [ageGen, location];
  };

  render() {
    const {
      id,
      first_name,
      last_name,
      full_name,
      avatar_url,
      date_of_birth,
      gender,
      city,
      state,
      zip,
    } = this.state.user;
    return (
      <LayoutScrollViewWithHeader headerTitle="Profile" canRefresh={false}>
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
              <StyledOrganization>Member since 2015</StyledOrganization>
            </StyledColumnView>
          </StyledRowView>
          <StyledButton onPress={() => this.handleFirstLargeButton()}>
            <StyledButtonText>Edit My Profile</StyledButtonText>
          </StyledButton>
        </SectionCard>

        <SectionCard>
          <Label text="About you" />
          <StyledInfoView>
            <AboutCard
              info={this.createInfoArray(
                date_of_birth,
                city,
                state,
                zip,
                gender,
              )}
            />
          </StyledInfoView>
        </SectionCard>

        <SettingsScreen />
      </LayoutScrollViewWithHeader>
    );
  }
}

export default ProfileScreen;
