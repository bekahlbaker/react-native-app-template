import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  getAllPosts,
  getSinglePost,
  likePost,
  unlikePost,
  destroyPost,
} from '../redux/actions/posts.actions';
import LayoutScrollViewWithHeader from '../components/LayoutScrollViewWithHeader';
import FeedCard from '../components/FeedCard';
import ActionSheet from '../components/ActionSheet';
import PickerModal from '../components/PickerModal';
import colors from '../components/Global/colors';
// import PushNotifications from '../PushNotifications/PushNotifications';
import BottomOfPostsCard from '../components/BottomOfPostsCard';
import NothingHereYetCard from '../components/NothingHereYetCard';
import LoadMoreCard from '../components/LoadMoreCard';
import Add from '../assets/images/Add.png';
import EditIconPencil from '../assets/images/EditIconPencil.png';
import NewPostIcon from '../assets/images/NewPostIcon.png';
import MessageMemberIcon from '../assets/images/MessageMemberIcon.png';
import DeleteIcon from '../assets/images/DeleteIcon.png';
import { DEVICE_WIDTH } from '../components/Header';

const fakePosts = [
  {
    body:
      "Think about a cloud. Just float around and be there. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. Brown is such a nice color. This is your world. And maybe, maybe, maybe... You can get away with a lot. Everyone wants to enjoy the good parts - but you have to build the framework first. That's why I paint - because I can create the kind of world I want - and I can make this world as happy as I want it. Let's make a nice big leafy tree. At home you have unlimited time.",
    comments: [],
    created_at: '2019-05-06T19:08:12.685Z',
    id: 272,
    images: [
      {
        file_medium_url:
          'https://church-groups-staging.s3.amazonaws.com/images/files/000/000/195/medium/image.jpg?1555087958',
        file_thumbail_url:
          'https://church-groups-staging.s3.amazonaws.com/images/files/000/000/195/thumb/image.jpg?1555087958',
        file_url:
          'https://church-groups-staging.s3.amazonaws.com/images/files/000/000/195/original/image.jpg?1555087958',
        id: 195,
      },
    ],
    reactions: [],
    title: 'Hello World!',
    updated_at: '2019-05-06T19:08:12.685Z',
    user: {
      avatar_url:
        'https://church-groups-staging.s3.amazonaws.com/users/avatars/000/000/084/original/Pam_Beesley.jpg?1551991792',
      city: 'Scranton',
      created_at: '2019-02-28T16:21:31.390Z',
      date_of_birth: '1078-01-01T00:00:00.000Z',
      email: 'pam@scc.com',
      first_name: 'Pam',
      full_name: 'Pam Halpert',
      gender: 'Female',
      id: 84,
      is_super_admin: false,
      last_name: 'Halpert',
      organization_ids: [44],
      phone: '5555555532',
      state: 'PA',
      zip: '18503',
    },
    user_id: 84,
  },
];

class MainFeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: fakePosts,
      filteredPosts: fakePosts,
      unreadPosts: [],
      searchValue: '',
      isShowingLikesList: false,
      selectedReactions: [],
      selectedPostIndex: 0,
      isConfirmingDelete: false,
      postDetailIsOpen: false,
      actionSheetVisible: false,
      actions: [],
      actionSheetTitle: '',
      refreshing: false,
    };
  }

  componentDidMount() {
    // this.props.getAllPosts();
  }

  componentDidUpdate(prevProps) {
    const { posts } = this.props;

    // Handle loading posts with all
    // Ignore when loading a single post for Post Show
    if (
      prevProps.posts.status !== posts.status &&
      posts.status.includes('allPostsForUser')
    ) {
      this.setState({
        posts: posts.results,
        filteredPosts: posts.results,
        refreshing: false,
      });
    }

    // When a post is liked/unliked/edited, splice in updated post into current filtered array
    if (
      prevProps.posts.status !== posts.status &&
      (posts.status.includes('likePost') ||
        posts.status.includes('unlikePost') ||
        posts.status.includes('editPost'))
    ) {
      const updatedArr = this.state.filteredPosts;
      updatedArr.splice(this.state.selectedPostIndex, 1, posts.results);
      this.setState({
        filteredPosts: updatedArr,
      });
    }
    // When a new post is created, add to beginning of array
    if (
      prevProps.posts.status !== posts.status &&
      posts.status.includes('newPost')
    ) {
      const updatedArr = this.state.filteredPosts;
      updatedArr.splice(0, 0, posts.results);
      this.setState({
        filteredPosts: updatedArr,
      });
    }
    // When a new post is deleted, remove from array
    if (
      prevProps.posts.status !== posts.status &&
      posts.status.includes('deletePost')
    ) {
      const updatedArr = this.state.filteredPosts;
      updatedArr.splice(this.state.selectedPostIndex, 1);
      this.setState({
        filteredPosts: updatedArr,
      });
    }
  }

  handleRightHeaderButton = () => {
    this.determineActionSheetActions('newActions');
  };

  handleSearch = searchValue => {
    if (searchValue !== '') {
      this.setState({ searchValue }, () => {
        const filtered = this.state.posts.filter(
          item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.body.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.user.full_name
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
        );
        this.setState({ filteredPosts: filtered });
      });
    } else {
      this.setState({ filteredPosts: this.state.posts, searchValue: '' });
    }
  };

  scrollToTop = () => {
    setTimeout(
      () => this.scrollView.scrollTo({ x: 0, y: 0, animated: true }),
      100,
    );
  };

  /* New Action Sheet */
  handleNewPost = groupSelected => {
    this.setState({ actionSheetVisible: false });
    this.props.navigation.navigate('CreatePost', {
      postToEdit: null,
    });
  };

  handleNewMessage = () => {
    this.setState({ actionSheetVisible: false });
    this.props.navigation.navigate('CreateMessage', { user: null });
  };

  /* Handle Likes/Unlikes */
  handleLike = (value, index) => {
    this.props.likePost(value);
    this.setState({ selectedPostIndex: index });
  };

  handleUnlike = (value, index) => {
    this.props.unlikePost(value, this.props.user.id);
    this.setState({ selectedPostIndex: index });
  };

  showLikes = value => {
    this.setState({
      isShowingLikesList: true,
      selectedReactions: value.reactions,
    });
  };

  replacePost = (post, index) => {
    // console.log('INDEX REPLACE POST ', index);
    const updatedArr = this.state.filteredPosts;
    updatedArr.splice(index, 1, post);
    this.setState({
      filteredPosts: updatedArr,
    });
  };

  /* Post Feed Actions */
  showDetails = (post, isCommenting, index) => {
    this.setState(
      {
        selectedPostIndex: index,
        postDetailIsOpen: true,
      },
      () => {
        this.props.navigation.navigate('PostDetail', {
          post,
          isCommenting,
          replacePost: updatedPost => this.replacePost(updatedPost, index),
          onGoBack: () => this.setState({ postDetailIsOpen: false }),
          shouldGoBackToIndex: false,
          shouldGoBackToNotifications: false,
          shouldGoBackToProfile: false,
        });
      },
    );
  };

  handleLoadMore = () => {
    this.props.getAllPosts(this.props.posts.currentPage + 1);
  };

  /* Changes to a Post Action Sheet */
  handleEditPost = () => {
    this.setState({ actionSheetVisible: false });
    this.props.navigation.navigate('CreatePost', {
      postToEdit: this.state.selectedPost,
    });
  };

  handleDeletePost = () => {
    if (this.state.isConfirmingDelete) {
      this.setState({
        actionSheetVisible: false,
        isConfirmingDelete: false,
      });
      this.props.destroyPost(this.state.selectedPost);
    } else {
      this.setState({ isConfirmingDelete: true }, () =>
        this.determineActionSheetActions('postActions'),
      );
    }
  };

  handleSendMessage = user => {
    this.setState({ isShowingGroupMembers: false });
    this.props.navigation.navigate('CreateMessage', {
      user,
    });
  };

  handleOpenNotification = () => {
    setTimeout(() => {
      this.props.navigation.navigate('NotificationsTab');
    }, 500);
  };

  onOtherNotificationReceivedInForeground = notification => {
    if (!this.state.postDetailIsOpen) {
      this.props.getAllPosts();
    }
    // Do nothing if inside post
  };

  // DETERMINE ACTION SHEET ACTIONS
  determineActionSheetActions = type => {
    switch (type) {
      case 'newActions':
        this.setState({
          actionSheetVisible: true,
          actionSheetTitle: 'Create New',
          actions: [
            {
              title: 'New Post',
              icon: NewPostIcon,
              onPress: () => this.handleNewPost(false),
            },
            {
              title: 'New Private Message',
              icon: MessageMemberIcon,
              onPress: () => this.handleNewMessage(),
            },
          ],
        });
        break;
      case 'postActions':
        this.setState({
          actionSheetVisible: true,
          actionSheetTitle: this.state.isConfirmingDelete
            ? 'Are you sure?'
            : 'Make changes to post?',
          actions: this.state.isConfirmingDelete
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
              ],
        });
        break;
      default:
        break;
    }
  };

  showPostOptionModal = (post, index) => {
    this.determineActionSheetActions('postActions');
    this.setState({
      selectedPost: post,
      selectedPostIndex: index,
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true }, () => this.props.getAllPosts());
  };

  render() {
    const { posts, categories, user, navigation } = this.props;
    return (
      <LayoutScrollViewWithHeader
        hasBar
        width={DEVICE_WIDTH - 120}
        backgroundColor={colors.darkerBase}
        inputColor={'#D2FBF8'}
        placeholderTextColor={'#D2FBF8'}
        value={this.state.searchValue}
        placeholder="Search"
        onChangeText={searchValue => this.handleSearch(searchValue)}
        headerTitle=""
        rightHeaderIcon={Add}
        rightHeaderButtonAction={this.handleRightHeaderButton}
        overlay={this.state.actionSheetVisible}
        myRef={ref => (this.scrollView = ref)}
        canRefresh
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      >
        {/* <PushNotifications
          onOpenNotification={() => this.handleOpenNotification()}
          onMessageNotificationReceivedInForeground={() =>
            console.log('do nothing')
          }
          onOtherNotificationReceivedInForeground={() =>
            this.onOtherNotificationReceivedInForeground()
          }
        /> */}
        <ActionSheet
          modalVisible={this.state.actionSheetVisible}
          closeModal={() => this.setState({ actionSheetVisible: false })}
          title={this.state.actionSheetTitle}
          actions={this.state.actions}
        />
        <FlatList
          extraData={this.state}
          data={this.state.filteredPosts}
          renderItem={({ item, index }) => (
            <FeedCard
              shouldTruncate
              post={item}
              onPressLike={values => this.handleLike(values, index)}
              onPressUnlike={values => this.handleUnlike(values, index)}
              onPressComment={post => this.showDetails(post, true, index)}
              onPressViewLikes={() => this.showLikes(item)}
              showDetails={post => this.showDetails(post, false, index)}
              currentUserId={user.id}
              isViewingDetails={false}
              showPostOptionModal={post =>
                this.showPostOptionModal(post, index)
              }
            />
          )}
          keyExtractor={item => `${item.id}`}
          style={{ paddingBottom: 20 }}
        />

        {posts.currentPage < posts.allPages && posts.allPages > 1 && (
          <LoadMoreCard onPress={() => this.handleLoadMore()} />
        )}

        {posts.currentPage === posts.allPages &&
          this.state.filteredPosts.length > 0 && (
            <BottomOfPostsCard onPress={() => this.scrollToTop()} />
          )}
        {(posts.status.includes('allPosts') ||
          posts.status.includes('singleGroupComplete') ||
          posts.status.includes('allComplete')) &&
          this.state.filteredPosts.length === 0 &&
          this.state.unreadPosts.length === 0 && (
            <NothingHereYetCard onPress={() => this.handleNewPost(true)} />
          )}
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
      </LayoutScrollViewWithHeader>
    );
  }
}

const mapStateToProps = state => ({
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
    destroyPost,
  },
)(MainFeedScreen);
