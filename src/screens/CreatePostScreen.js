import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { createPost, editPost } from '../redux/actions/posts.actions';
import HeaderDetail from '../components/HeaderDetail';
import ImagePreview from '../components/ImagePreview';
import ImagePickerButton from '../components/ImagePicker';
import AutoGrowTextField from '../components/AutoGrowTextField';
import SectionCardCentered from '../components/SectionCardCentered';
import colors from '../components/Global/colors';
import BackArrowBlack from '../assets/images/BackArrowBlack.png';
import BottomActionButton from '../components/BottomActionButton';
import TransparentInput from '../components/TransparentInput';
import ActionSheet from '../components/ActionSheet';
import CameraIcon from '../assets/images/CameraIcon.png';
import PhotoLibraryIcon from '../assets/images/PhotoLibraryIcon.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const StyledContainer = styled.View`
  background-color: ${colors.background};
  align-self: stretch;
  flex: 1;
`;

const StyledImagePickerButton = styled.View`
  align-self: flex-end;
`;

const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

const StyledInputView = styled.View`
  background-color: ${colors.white};
  height: 100;
`;

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postToEdit: this.props.navigation.state.params.postToEdit,
      selectedGroup: this.props.navigation.state.params.selectedGroup,
      group: null,
      groupHasError: false,
      category: null,
      categoryHasError: false,
      titleValue: '',
      titleHasError: false,
      contentValue: '',
      contentHasError: false,
      images: [],
      didSubmitPost: false,
      removedImages: [],
      readyToPost: this.props.navigation.state.params.postToEdit ? true : false,
      actionSheetVisible: false,
      groupOptions: [],
    };
  }

  componentDidMount() {
    if (this.state.postToEdit) {
      this.setUpEdit();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { status, results, error } = this.props.posts;
    if (
      prevProps.posts.status !== status &&
      status.includes('newPost') &&
      results &&
      !error
    ) {
      // Navigate back and add to top of index
      this.props.navigation.goBack();
    } else if (
      status === 'failed' &&
      error &&
      !results &&
      this.state.didSubmitPost &&
      !prevState.didSubmitPost
    ) {
      this.setState({ didSubmitPost: false });
      // Show Error
    }

    if (prevProps.posts.status !== status && status.includes('editPost')) {
      this.props.navigation.goBack();
    }
  }

  changeFormValue = value => {
    this.setState({ ...value }, () => {
      if (
        this.state.group &&
        this.state.category &&
        this.state.titleValue !== '' &&
        this.state.contentValue !== ''
      ) {
        this.setState({ readyToPost: true });
      } else {
        this.setState({ readyToPost: false });
      }
    });
  };

  setUpEdit = () => {
    const {
      body,
      category_id,
      group_id,
      images,
      title,
    } = this.state.postToEdit;
    // Filter groups by group_id
    const filteredGroup = this.props.user.active_groups.filter(
      group => group.id === group_id,
    )[0];
    // Filter categories by category_id
    const filteredCategory = this.props.categories.results.filter(
      cat => cat.id === category_id,
    )[0];
    this.setState({
      titleValue: title,
      contentValue: body,
      images,
      group: filteredGroup,
      category: filteredCategory,
    });
  };

  handleLeftHeaderButton = () => {
    this.props.navigation.goBack();
  };

  handleRightHeaderButton = () => {
    const { group, category, titleValue } = this.state;
    this.setState(
      {
        groupHasError: '',
        categoryHasError: '',
        titleHasError: '',
      },
      () => {
        if (!group) {
          this.setState({
            groupHasError: true,
          });
        }
        if (!category) {
          this.setState({ categoryHasError: true });
        }
        if (titleValue === '') {
          this.setState({ titleHasError: true });
        }
        if (group && category && titleValue !== '') {

          this.setState({ didSubmitPost: true }, () => {
            if (this.state.postToEdit) {
              // EDITING POST
              const formData = new FormData();
              formData.append('category_id', this.state.category.id);
              formData.append('title', this.state.titleValue);
              formData.append('body', this.state.contentValue);

              // EDIT IMAGES
              if (this.state.images) {
                this.state.images.forEach((image, index) => {
                  if (typeof image.file_url !== 'string') {
                    formData.append(`images_attributes[${index}][attachment]`, {
                      uri: image,
                      name: 'image.jpg',
                      type: 'image/jpg',
                    });
                  }
                });
              }

              // DELETED IMAGES
              if (this.state.removedImages) {
                this.state.removedImages.forEach((image, index) => {
                  formData.append(`images_attributes[${index}][id]`, image.id);
                  formData.append(
                    `images_attributes[${index}][_destroy]`,
                    true,
                  );
                });
              }

              this.props.editPost(this.state.postToEdit, formData);
            } else {
              const formData = new FormData();
              formData.append('group_id', this.state.group.id);
              formData.append('category_id', this.state.category.id);
              formData.append('title', this.state.titleValue);
              formData.append('body', this.state.contentValue);

              this.state.images.forEach((image, index) =>
                formData.append(`images_attributes[][attachment]`, {
                  uri: image,
                  name: 'image.jpg',
                  type: 'image/jpg',
                }),
              );

              this.props.createPost(formData);
            }
          });
        }
      },
    );
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
            // console.log('NEW IMAGE ', response);
            this.setState({
              actionSheetVisible: false,
              images: [...this.state.images, response.uri],
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
            // console.log('NEW IMAGE ', response);
            this.setState({
              actionSheetVisible: false,
              images: [...this.state.images, response.uri],
            });
          })
          .catch(err => {
            // console.log('ERROR UPLOADING ', err);
          });
      }
    });
  };

  handleRemoveImage = value => {
    if (this.state.postToEdit) {
      const images = this.state.images;
      const newArray = images.filter(el => el.id !== value.id);
      this.setState({
        images: newArray,
        removedImages: [...this.state.removedImages, value],
      });
    } else {
      const images = this.state.images;
      const newArray = images.filter(el => el !== value);
      this.setState({ images: newArray });
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.actionSheetVisible && <StyledOverlay />}
        <HeaderDetail
          hasBar={false}
          headerTitle={this.state.postToEdit ? 'Edit Post' : 'New Post'}
          leftHeaderIcon={BackArrowBlack}
          leftHeaderButtonAction={this.handleLeftHeaderButton}
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
            keyboardVerticalOffset={150}
            style={{ flex: 1 }}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
          >
            <ScrollView>
              <SectionCardCentered hasError={this.state.titleHasError}>
                <TransparentInput
                  value={this.state.titleValue}
                  placeholder="Post Title"
                  onChangeText={titleValue =>
                    this.changeFormValue({ titleValue })
                  }
                  placeholderTextColor={colors.mediumNeutral}
                />
              </SectionCardCentered>
              <SectionCardCentered hasError={this.state.contentHasError}>
                <StyledInputView>
                  <AutoGrowTextField
                    placeholder="What do you want to say?"
                    onChangeText={contentValue =>
                      this.changeFormValue({ contentValue })
                    }
                    value={this.state.contentValue}
                    textColor={colors.mediumNeutral}
                    shouldHaveSendButton={false}
                  />
                </StyledInputView>
              </SectionCardCentered>
              <ImagePreview
                isEditing={this.state.postToEdit !== null}
                images={this.state.images}
                onPressRemove={value => this.handleRemoveImage(value)}
              />
              <StyledImagePickerButton>
                <ImagePickerButton
                  onPress={() =>
                    Platform.OS === 'ios'
                      ? this.setState({ actionSheetVisible: true })
                      : this.handleUploadImage()
                  }
                />
              </StyledImagePickerButton>
            </ScrollView>
          </KeyboardAvoidingView>
          <BottomActionButton
            active={this.state.readyToPost}
            title="Post"
            onPress={() => this.handleRightHeaderButton()}
          />
        </StyledContainer>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  organizations: state.organizations,
  posts: state.posts,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { createPost, editPost },
)(CreatePostScreen);
