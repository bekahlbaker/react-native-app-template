import React, { Component } from 'react';
import {
  FlatList,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import {
  getAllPosts,
  getSinglePost,
  likePost,
  unlikePost,
  createComment,
  likeComment,
  unlikeComment,
  destroyPost,
  editComment,
  destroyComment,
} from '../redux/actions/posts.actions';
import HeaderDetail from '../components/HeaderDetail';
import FeedCard from '../components/FeedCard';
import CommentCard from '../components/CommentCard';
import AutoGrowTextField from '../components/AutoGrowTextField';
// import PushNotifications from '../PushNotifications/PushNotifications';
import PickerModal from '../components/PickerModal';
import ActionSheet from '../components/ActionSheet';
import BackArrowBlack from '../assets/images/BackArrowBlack.png';
import colors from '../components/Global/colors';
import EditIconPencil from '../assets/images/EditIconPencil.png';
import DeleteIcon from '../assets/images/DeleteIcon.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const StyledOverlay = styled.View`
  height: ${DEVICE_HEIGHT};
  width: ${DEVICE_WIDTH};
  background-color: 'rgba(29, 30, 33,0.5)';
  z-index: 1;
  position: absolute;
`;

const StyledInputView = styled.View`
  align-self: center;
  flex-direction: row;
  width: 100%;
  background-color: ${colors.background};
  padding: 10px;
`;

class PostShowScreen extends Component {
  constructor(props) {
    super(props);

    const {
      shouldGoBackToIndex,
      shouldGoBackToNotifications,
      shouldGoBackToProfile,
    } = this.props.navigation.state.params;

    this.state = {
      // compare user id to post's user id
      isCurrentUser: true,
      post: this.props.navigation.state.params.post,
      comments: this.props.navigation.state.params.post.comments,
      commentValue: '',
      isCommenting: false,
      commentsOpen: true,
      selectedCommentIndex: 0,
      isShowingLikesList: false,
      selectedReactions: [],
      postOptionModalVisible: false,
      isConfirmingDelete: false,
      commentOptionModalVisible: false,
      selectedComment: '',
      isEditing: false,
      groupOptions: [],
      shouldGoBackToIndex,
      shouldGoBackToNotifications,
      shouldGoBackToProfile,
    };
  }

  componentDidMount() {
    this.props.getSinglePost(this.state.post.id);
    // Add listener to notification
    // Create new message from notification content and append to messages
    // setTimeout(() => {
    //   let comment = {
    //     timeStamp: new Date(),
    //     userName: 'Stanley Hudson',
    //     groupName: "Men's Basketball Group",
    //     profileUrl:
    //       'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    //     comment: 'Is it pretzel day yet??',
    //   };
    //   this.addNewCommentToPost(comment);
    // }, 3000);
    if (this.props.navigation.state.params.isCommenting) {
      this.setState({ isCommenting: true }, () => {
        this.scrollToEndOfPost();
        this.addNewComment();
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('SHOW ', prevProps, this.props);
    if (
      prevProps.posts.status !== this.props.posts.status &&
      this.props.posts.status.includes('singleComplete')
    ) {
      this.setState(
        {
          post: this.props.posts.results,
          comments: this.props.posts.results.comments,
        },
        () => {
          // console.log('CAlLING REPLACE POST ');
          this.props.navigation.state.params.replacePost(
            this.props.posts.results,
          );
        },
      );
    }
    // When a comment is liked/unlike, splice in updated comment into current comment array
    if (
      prevProps.posts.status !== this.props.posts.status &&
      (this.props.posts.status.includes('likeComment') ||
        this.props.posts.status.includes('unlikeComment'))
    ) {
      const updatedArr = this.props.posts.results.comments;
      updatedArr.splice(
        this.state.selectedCommentIndex,
        1,
        this.props.posts.comment,
      );
      this.setState(
        {
          comments: [],
        },
        () => {
          this.setState({ comments: updatedArr });
        },
      );
    }
    // Handle Splice in updated comment
    if (
      prevProps.posts.status !== this.props.posts.status &&
      this.props.posts.status.includes('editComment')
    ) {
      const updatedArr = this.state.comments;
      updatedArr.splice(
        this.state.selectedCommentIndex,
        1,
        this.props.posts.results,
      );
      this.setState({ comments: updatedArr, commentValue: '' });
    }
    // Handle delete a comment
    if (
      prevProps.posts.status !== this.props.posts.status &&
      this.props.posts.status.includes('destroyComment')
    ) {
      const updatedArr = this.state.comments;
      updatedArr.splice(this.state.selectedCommentIndex, 1);
      this.setState({ comments: updatedArr });
    }
    // When a post is deleted, go back to Main Feed when complete
    if (
      prevProps.posts.status !== this.props.posts.status &&
      this.props.posts.status.includes('deletePost')
    ) {
      this.props.navigation.goBack();
    }
  }

  scrollToEndOfPost = () => {
    setTimeout(() => this.scrollView.scrollToEnd({ animated: false }), 100);
  };

  handleLeftHeaderButton = () => {
    // if (this.state.shouldGoBackToIndex) {
    //   this.props.navigation.navigate('MainFeed');
    //   this.props.navigation.setParams({ shouldGoBackToIndex: false });
    // } else if (this.state.shouldGoBackToNotifications) {
    //   this.props.navigation.navigate('Notifications');
    //   this.props.navigation.setParams({ shouldGoBackToNotifications: false });
    // } else if (this.state.shouldGoBackToProfile) {
    //   this.props.navigation.navigate('Profile');
    //   this.props.navigation.setParams({ shouldGoBackToProfile: false });
    // } else {
    //   if (this.props.navigation.state.params.onGoBack) {
    //     this.props.navigation.state.params.onGoBack();
    //   }
    this.props.navigation.goBack();
    // }
    // this.setState({
    //   shouldGoBackToIndex: false,
    //   shouldGoBackToNotifications: false,
    //   shouldGoBackToProfile: false,
    // });
  };

  handleRightHeaderButton = () => {
    this.scrollToEndOfPost();
    this.addNewComment();
  };

  onSubmitPost = post => {
    this.setState({ post });
  };

  showComments = values => {
    // console.log('Show all comments ', values);
    this.setState({ commentsOpen: !this.state.commentsOpen });
  };

  handleLike = value => {
    this.props.likePost(value);
  };

  handleUnlike = value => {
    this.props.unlikePost(value, this.props.user.id);
  };

  handleLikeComment = (value, index) => {
    this.props.likeComment(this.state.post, value);
    this.setState({ selectedCommentIndex: index });
  };

  handleUnlikeComment = (values, index) => {
    this.props.unlikeComment(this.state.post, values, this.props.user.id);
    this.setState({ selectedCommentIndex: index });
  };

  showLikes = value => {
    this.setState({
      isShowingLikesList: true,
      selectedReactions: value.reactions,
    });
  };

  addNewComment = () => {
    this.setState({ isCommenting: true }, () => {
      this.textField.focus();
    });
  };

  handleSubmitComment = () => {
    if (this.state.commentValue) {
      if (this.state.isEditing) {
        this.props.editComment(
          this.state.post.id,
          this.state.selectedComment,
          this.state.commentValue,
        );
      } else {
        const comment = {
          content: this.state.commentValue,
          created_at: new Date(),
          id: new Date(),
          post_id: this.state.post.id,
          reactions: [],
          user: this.props.user,
        };
        this.addNewCommentToPost(comment);
        this.props.createComment(this.state.post, this.state.commentValue);
      }
    }
  };

  addNewCommentToPost = comment => {
    this.setState(
      {
        isCommenting: false,
        commentValue: '',
        comments: [...this.state.comments, comment],
      },
      () => {
        this.scrollToEndOfPost();
      },
    );
  };

  onOtherNotificationReceivedInForeground = notification => {
    this.props.getSinglePost(this.state.post.id);
    // const {
    //   main_id,
    //   body,
    //   post_id,
    //   user_id,
    //   is_type
    // } = notification._data.custom_notification;
    // if (post_id === this.state.post.id) {
    //   if (is_type === 'Comment') {
    //     const comment = {
    //       content: body,
    //       created_at: new Date(),
    //       id: main_id,
    //       post_id: post_id,
    //       reactions: [],
    //       user: user_id,
    //     };
    //     this.addNewCommentToPost(comment);
    //   }

    //   if (is_type === 'Reaction') {
    //     if (main_id === this.state.post.id) {
    //       // Add Reaction to Post
    //     } else {
    //       // Filter comments and add reaction to Comment
    //     }
    //   }
    // }
  };

  /* Changes to a Post Action Sheet */
  handleEditPost = () => {
    this.setState({ postOptionModalVisible: false });
    this.props.navigation.navigate('CreatePost', {
      postToEdit: this.state.post,
      selectedGroup: null,
    });
  };

  handleDeletePost = () => {
    if (this.state.isConfirmingDelete) {
      this.setState({
        postOptionModalVisible: false,
        isConfirmingDelete: false,
      });
      this.props.destroyPost(this.state.post);
      // this.props.navigation.goBack();
    } else {
      this.setState({ isConfirmingDelete: true });
    }
  };

  /* Changes to Comment Action Sheet */
  handleEditComment = () => {
    this.setState(
      {
        isEditing: true,
        commentOptionModalVisible: false,
        commentValue: this.state.selectedComment.content,
      },
      () => this.addNewComment(),
    );
    // this.props.navigation.navigate('CreateComment', {
    //   postToEdit: this.state.post,
    // });
  };

  handleDeleteComment = () => {
    if (this.state.isConfirmingDelete) {
      this.setState({
        commentOptionModalVisible: false,
        isConfirmingDelete: false,
      });
      this.props.destroyComment(
        this.state.post.id,
        this.state.selectedComment.id,
      );
    } else {
      this.setState({ isConfirmingDelete: true });
    }
  };

  render() {
    // console.log(this.props);
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {(this.state.postOptionModalVisible ||
          this.state.commentOptionModalVisible) && <StyledOverlay />}
        <HeaderDetail
          hasBar={false}
          headerTitle={this.state.post.title}
          leftHeaderIcon={BackArrowBlack}
          leftHeaderButtonAction={this.handleLeftHeaderButton}
        />

        {/* <PushNotifications
          onOpenNotification={() => console.log('do nothing')}
          onMessageNotificationReceivedInForeground={() =>
            console.log('do nothing')
          }
          onOtherNotificationReceivedInForeground={() =>
            this.onOtherNotificationReceivedInForeground()
          }
        /> */}
        <ActionSheet
          modalVisible={this.state.postOptionModalVisible}
          closeModal={() => this.setState({ postOptionModalVisible: false })}
          title={
            this.state.isConfirmingDelete
              ? 'Are you sure?'
              : 'Make changes to post?'
          }
          actions={
            this.state.isConfirmingDelete
              ? [
                  {
                    title: 'Delete Post',
                    icon: DeleteIcon,
                    onPress: () => this.handleDeletePost(true),
                  },
                ]
              : [
                  {
                    title: 'Edit',
                    icon: EditIconPencil,
                    onPress: () => this.handleEditPost(),
                  },
                  {
                    title: 'Delete',
                    icon: DeleteIcon,
                    onPress: () => this.handleDeletePost(false),
                  },
                ]
          }
        />
        <ActionSheet
          modalVisible={this.state.commentOptionModalVisible}
          closeModal={() => this.setState({ commentOptionModalVisible: false })}
          title={
            this.state.isConfirmingDelete
              ? 'Are you sure?'
              : 'Make changes to comment?'
          }
          actions={
            this.state.isConfirmingDelete
              ? [
                  {
                    title: 'Delete Comment',
                    icon: DeleteIcon,
                    onPress: () => this.handleDeleteComment(true),
                  },
                ]
              : [
                  {
                    title: 'Edit',
                    icon: EditIconPencil,
                    onPress: () => this.handleEditComment(),
                  },
                  {
                    title: 'Delete',
                    icon: DeleteIcon,
                    onPress: () => this.handleDeleteComment(false),
                  },
                ]
          }
        />
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={{
            flex: 1,
            backgroundColor: colors.background,
            alignSelf: 'stretch',
          }}
        >
          <FeedCard
            post={this.state.post}
            onPressLike={values => this.handleLike(values)}
            onPressUnlike={values => this.handleUnlike(values)}
            onPressViewLikes={() => this.showLikes(this.state.post)}
            onPressComment={() => this.addNewComment()}
            onPressViewComments={values => this.showComments(values)}
            showDetails={() => console.log('show details')}
            categories={this.props.categories.results}
            groups={this.state.groupOptions}
            currentUserId={this.props.user.id}
            onSelectUser={user =>
              this.props.navigation.navigate('Profile', {
                user,
              })
            }
            isViewingDetails
            showPostOptionModal={() =>
              this.setState({
                postOptionModalVisible: true,
              })
            }
          />
          {this.state.commentsOpen && (
            <FlatList
              extraData={this.state}
              data={this.state.comments}
              renderItem={({ item, index }) => (
                <CommentCard
                  comment={item}
                  onPressLike={values => this.handleLikeComment(values, index)}
                  onPressUnlike={values =>
                    this.handleUnlikeComment(values, index)
                  }
                  currentUserId={this.props.user.id}
                  onPressViewLikes={() => this.showLikes(item)}
                  showCommentOptionModal={() =>
                    this.setState({
                      commentOptionModalVisible: true,
                      selectedCommentIndex: index,
                      selectedComment: item,
                    })
                  }
                />
              )}
              keyExtractor={item => `${item.id}`}
            />
          )}
        </ScrollView>
        <PickerModal
          visible={this.state.isShowingLikesList}
          title="Likes"
          onClose={() =>
            this.setState({
              isShowingLikesList: false,
              selectedReactions: [],
            })
          }
          onSelection={option => console.log(option)}
          options={this.state.selectedReactions}
          iconName="ios-people"
          isGroupPicker={false}
          onPress={() => console.log('Pressed')}
          type="likes"
          isSelectable={false}
        />
        <KeyboardAvoidingView
          behavior="padding"
          enabled={Platform.OS === 'ios'}
        >
          <StyledInputView>
            <AutoGrowTextField
              placeholder="Leave a comment..."
              onChangeText={commentValue => this.setState({ commentValue })}
              value={this.state.commentValue}
              myRef={ref => (this.textField = ref)}
              onFocus={() =>
                setTimeout(() => {
                  this.scrollView.scrollToEnd();
                }, 0)
              }
              onSubmit={this.handleSubmitComment}
              textColor={
                this.state.commentValue.length > 0
                  ? colors.darkNeutral
                  : colors.lightNeutral
              }
              shouldHaveSendButton
              buttonTitle={this.state.isEditing ? 'Edit' : 'Comment'}
            />
          </StyledInputView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  user: state.user,
  posts: state.posts,
});

export default connect(
  mapStateToProps,
  {
    getAllPosts,
    getSinglePost,
    likePost,
    unlikePost,
    createComment,
    likeComment,
    unlikeComment,
    destroyPost,
    editComment,
    destroyComment,
  },
)(PostShowScreen);
