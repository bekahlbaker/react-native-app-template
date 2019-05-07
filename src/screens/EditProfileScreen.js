import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import moment from 'moment';
import { updateUserProfile } from '../redux/actions/users.actions';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import PickerModal from '../components/PickerModal';
import ProfileItemCard from '../components/More/ProfileItemCard';
import SectionCard from '../components/More/SectionCard';
import colors from '../components/Global/colors';
import Label from '../components/Label';
import EditIconPencil from '../assets/images/EditIconPencil.png';
import ActionSheet from '../components/ActionSheet';
import CameraIcon from '../assets/images/CameraIcon.png';
import PhotoLibraryIcon from '../assets/images/PhotoLibraryIcon.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

const StyledContainer = styled.View`
  background-color: ${colors.background};
  align-self: stretch;
  flex: 1;
  padding-top: 6;
`;

const StyledLabelView = styled.View`
  margin-left: 10;
  align-self: flex-start;
`;

const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 15;
  padding-bottom: 15;
`;

const StyledColumnView = styled.View`
  flex-direction: column;
  margin-left: 10;
`;

const StyledAvatarView = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledEditPhotoButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 100;
  width: 60;
  height: 60;
  justify-content: center;
  align-items: center;
`;

const StyledEditText = styled.Text`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  font-size: 12px;
  text-align: center;
  letter-spacing: -0.0861539px;
  text-decoration-line: underline;
  text-decoration-color: white;
  color: ${colors.white};
  margin-top: 30;
`;

const StyledOrganization = styled.Text`
  color: ${colors.mediumNeutral};
  font-family: OpenSans-Regular;
  font-weight: 600;
  line-height: 16px;
  font-size: 12px;
  letter-spacing: -0.0861539px;
`;

const StyledLabel = styled.Text`
  color: ${colors.mediumNeutral};
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  align-self: flex-start;
  margin-left: 12;
  margin-top: 10;
`;

const StyledNameTextField = styled.TextInput`
  color: ${colors.black};
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: -0.0738462px;
  width: 230;
`;

const StyledIconView = styled.TouchableOpacity`
  margin-right: 24;
  margin-bottom: 12;
`;

const StyledImage = styled.Image``;

const StyledEmailDisclaimer = styled.Text`
  color: ${colors.mediumNeutral};
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: -0.0738462px;
  margin: 20px 28px 20px 10px;
`;

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.state.params.user,
      didChooseNew: false,
      image: '',
      actionSheetVisible: false,
      isShowingStatePicker: false,
      isShowingGenderPicker: false,
    };
  }

  componentDidMount() {
    this.setUpUserInfo();
  }

  componentDidUpdate(prevProps) {
    // console.log('UPDATE ', prevProps, this.props);
    if (
      prevProps.user.auth !== this.props.user.auth &&
      this.props.user.auth.includes('update')
    ) {
      this.setState({ user: this.props.user }, () =>
        this.props.navigation.pop(),
      );
    }
  }

  setUpUserInfo = () => {
    const formattedDate = moment
      .utc(this.state.user.date_of_birth)
      .format('MM/DD/YYYY');
    // console.log(this.state.user.date_of_birth);
    // console.log('FORMATTED ', formattedDate);
    this.setState({
      user: { ...this.state.user, date_of_birth: formattedDate },
    });
  };

  handleLeftHeaderButton = () => {
    // console.log('Did Touch Left Button');
    this.props.navigation.pop();
  };

  handleRightHeaderButton = () => {
    const { user } = this.state;
    const names = user.full_name.split(' ');
    // console.log(names);
    const formdata = new FormData();
    formdata.append('first_name', names[0]);
    formdata.append('last_name', names[1] || '');

    if (user.phone !== null && user.phone !== 'null' && user.phone !== '') {
      formdata.append('phone', user.phone);
    }
    // else {
    //   formdata.append('phone', null);
    // }

    formdata.append('email', user.email);
    formdata.append('gender', user.gender);

    if (
      user.date_of_birth !== null &&
      user.date_of_birth !== 'Invalid date' &&
      user.date_of_birth !== ''
    ) {
      formdata.append(
        'date_of_birth',
        moment(user.date_of_birth).format('YYYY-MM-DD'),
      );
    }
    // else {
    //   formdata.append('date_of_birth', null);
    // }

    formdata.append('city', user.city);
    formdata.append('state', user.state);
    formdata.append('zip', user.zip);
    if (this.state.didChooseNew) {
      formdata.append('image', {
        uri: this.state.image,
        name: 'image.jpg',
        type: 'image/jpg',
      });
    }

    // console.log(formdata);
    this.props.updateUserProfile(this.props.user.id, formdata);
  };

  handleChangeFromForm = value => {
    this.setState({ user: { ...this.state.user, ...value } });
  };

  // TODO: Pull out and make it's own method that returns a URI
  handleUploadImage = () => {
    ImagePicker.showImagePicker(imagePickerRes => {
      if (!imagePickerRes.didCancel && !imagePickerRes.error) {
        let isFromCamera = false;
        if (
          Platform.OS === 'android' &&
          imagePickerRes.path.includes('Picture')
        ) {
          isFromCamera = true;
        }
        // console.log('Image ', imagePickerRes);
        ImageResizer.createResizedImage(
          imagePickerRes.uri,
          1000,
          800,
          'JPEG',
          80,
          Platform.OS === 'android' ? (isFromCamera ? 90 : 0) : 0,
        )
          .then(response => {
            // console.log('NEW IMAGE ', response);
            this.setState({ didChooseNew: true, image: response.uri });
          })
          .catch(err => {
            // console.log('ERROR UPLOADING ', err);
          });
      }
    });
  };

  handleUploadFromCamera = () => {
    // Launch Camera:
    ImagePicker.launchCamera(null, imagePickerRes => {
      // Same code as in above section!
      if (!imagePickerRes.didCancel && !imagePickerRes.error) {
        let isFromCamera = false;
        if (
          Platform.OS === 'android' &&
          imagePickerRes.path.includes('Picture')
        ) {
          isFromCamera = true;
        }
        // console.log('Image ', imagePickerRes);
        ImageResizer.createResizedImage(
          imagePickerRes.uri,
          1000,
          800,
          'JPEG',
          80,
          Platform.OS === 'android' ? (isFromCamera ? 90 : 0) : 0,
        )
          .then(response => {
            this.setState({
              didChooseNew: true,
              image: response.uri,
              actionSheetVisible: false,
            });
          })
          .catch(err => {
            // console.log('ERROR UPLOADING ', err);
          });
      }
    });
  };

  handleUploadFromGallery = () => {
    // Open Image Library:
    ImagePicker.launchImageLibrary(null, imagePickerRes => {
      // Same code as in above section!
      if (!imagePickerRes.didCancel && !imagePickerRes.error) {
        let isFromCamera = false;
        if (
          Platform.OS === 'android' &&
          imagePickerRes.path.includes('Picture')
        ) {
          isFromCamera = true;
        }
        // console.log('Image ', imagePickerRes);
        ImageResizer.createResizedImage(
          imagePickerRes.uri,
          1000,
          800,
          'JPEG',
          80,
          Platform.OS === 'android' ? (isFromCamera ? 90 : 0) : 0,
        )
          .then(response => {
            this.setState({
              didChooseNew: true,
              image: response.uri,
              actionSheetVisible: false,
            });
          })
          .catch(err => {
            // console.log('ERROR UPLOADING ', err);
          });
      }
    });
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
      email,
      phone,
    } = this.state.user;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        {this.state.actionSheetVisible && <StyledOverlay />}
        <Header
          title="Edit Profile"
          leftHeaderButtonTitle="Cancel"
          leftHeaderButtonAction={this.handleLeftHeaderButton}
          rightHeaderButtonTitle="Save"
          rightHeaderButtonAction={this.handleRightHeaderButton}
        />
        <ActionSheet
          modalVisible={this.state.actionSheetVisible}
          closeModal={() => this.setState({ actionSheetVisible: false })}
          title="Upload a photo"
          actions={[
            {
              title: 'Camera',
              icon: CameraIcon,
              onPress: () => this.handleUploadFromCamera(),
            },
            {
              title: 'Photo Gallery',
              icon: PhotoLibraryIcon,
              onPress: () => this.handleUploadFromGallery(),
            },
          ]}
        />
        <StyledContainer>
          <KeyboardAvoidingView
            keyboardVerticalOffset={120}
            style={{ flex: 1 }}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
          >
            <ScrollView>
              <SectionCard>
                <StyledRowView>
                  <StyledAvatarView>
                    <Avatar
                      size={70}
                      firstName={first_name}
                      lastName={last_name}
                      source={
                        this.state.didChooseNew
                          ? { uri: this.state.image }
                          : { uri: avatar_url }
                      }
                      onSelectUser={() => console.log('')}
                    />
                    <StyledEditPhotoButton
                      onPress={() =>
                        Platform.OS === 'ios'
                          ? this.setState({ actionSheetVisible: true })
                          : this.handleUploadImage()
                      }
                    >
                      <StyledEditText>Edit</StyledEditText>
                    </StyledEditPhotoButton>
                  </StyledAvatarView>
                  <StyledColumnView>
                    <StyledNameTextField
                      value={full_name}
                      placeholder="Full Name"
                      onChangeText={full_name =>
                        this.handleChangeFromForm({ full_name })
                      }
                      hasError={this.state.nameHasError}
                      ref={ref => (this.nameTextField = ref)}
                    />
                    <StyledOrganization>
                      {`Member Since ${created_at.substring(0, 4)}`}
                    </StyledOrganization>
                  </StyledColumnView>
                  <StyledIconView onPress={() => this.nameTextField.focus()}>
                    <StyledImage source={EditIconPencil} />
                  </StyledIconView>
                </StyledRowView>
              </SectionCard>

              {/* <ProfileItemCard
          label="Organization"
          value={this.props.organizations.results.name}
          placeholder="Organization"
          onChangeText={organization =>
            this.handleChangeFromForm({ organization })
          }
          hasError={this.state.organizationHasError}
        /> */}

              <StyledLabelView>
                <Label text="About You" />
              </StyledLabelView>

              <StyledLabel>Date of Birth:</StyledLabel>
              <ProfileItemCard
                isMasked
                type="datetime"
                options={{
                  format: 'DD/MM/YYYY',
                }}
                label="Date of Birth"
                value={date_of_birth}
                placeholder="Date of Birth"
                onChangeText={date_of_birth =>
                  this.handleChangeFromForm({ date_of_birth })
                }
                hasError={this.state.birthdateHasError}
                icon={EditIconPencil}
              />

              <StyledLabel>Gender:</StyledLabel>
              <ProfileItemCard
                isPicker
                value={gender}
                placeholder="Gender"
                icon={EditIconPencil}
                onSelectPicker={() =>
                  this.setState({ isShowingGenderPicker: true })
                }
              />

              <StyledLabel>City:</StyledLabel>
              <ProfileItemCard
                value={city}
                placeholder="City"
                onChangeText={city => this.handleChangeFromForm({ city })}
                hasError={this.state.cityHasError}
                icon={EditIconPencil}
              />

              <StyledLabel>State:</StyledLabel>
              <ProfileItemCard
                isPicker
                value={state}
                placeholder="State"
                icon={EditIconPencil}
                onSelectPicker={() =>
                  this.setState({ isShowingStatePicker: true })
                }
              />

              <StyledLabel>ZIP Code:</StyledLabel>
              <ProfileItemCard
                isMasked
                type="custom"
                options={{
                  mask: '99999',
                }}
                label="ZIP Code"
                value={zip}
                placeholder="ZIP Code"
                onChangeText={zip => this.handleChangeFromForm({ zip })}
                hasError={this.state.zipcodeHasError}
                icon={EditIconPencil}
              />

              <StyledEmailDisclaimer>
                We will only use this email and phone number to contact you. No
                one can see this information on your profile.
              </StyledEmailDisclaimer>

              <StyledLabel>Email:</StyledLabel>
              <ProfileItemCard
                label="Email"
                value={email}
                placeholder="Email"
                onChangeText={email => this.handleChangeFromForm({ email })}
                hasError={this.state.publicEmailHasError}
                icon={EditIconPencil}
              />

              <StyledLabel>Phone:</StyledLabel>
              <ProfileItemCard
                isMasked
                type="custom"
                options={{
                  mask: '(999) 999-9999',
                }}
                label="Phone"
                value={phone}
                placeholder="Phone"
                onChangeText={phone => this.handleChangeFromForm({ phone })}
                hasError={this.state.publicEmailHasError}
                icon={EditIconPencil}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </StyledContainer>
        <PickerModal
          visible={this.state.isShowingStatePicker}
          title="Choose State"
          onClose={() => this.setState({ isShowingStatePicker: false })}
          onSelection={option =>
            this.setState({
              user: { ...this.state.user, state: option.name },
              isShowingStatePicker: false,
            })
          }
          options={stateList}
          isGroupPicker={false}
          type="statePicker"
          isSelectable
        />
        <PickerModal
          visible={this.state.isShowingGenderPicker}
          title="Choose Gender"
          onClose={() => this.setState({ isShowingGenderPicker: false })}
          onSelection={option =>
            this.setState({
              user: { ...this.state.user, gender: option.name },
              isShowingGenderPicker: false,
            })
          }
          options={[{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]}
          isGroupPicker={false}
          type="genderPicker"
          isSelectable
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
  resources: state.resources,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { updateUserProfile },
)(EditProfileScreen);
