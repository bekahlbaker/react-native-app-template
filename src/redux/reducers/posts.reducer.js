import {
  POSTS,
  SINGLE_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  NEW_POST,
  EDIT_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/posts.actions';

// Initial state
const initialState = { status: 'pending', currentPage: 1, allPages: 1 };

// Reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case POSTS:
      // console.log('STATE ', state.results);
      // console.log('PAYLOAD ', action.payload.results);
      if (action.payload.currentPage !== 1) {
        return {
          status: action.payload.status,
          results: [...state.results, ...action.payload.results],
          currentPage: action.payload.currentPage,
          allPages: action.payload.allPages,
        };
      } else {
        return { ...state, ...action.payload };
      }
    case SINGLE_POST:
      return { status: action.payload.status, results: action.payload.results };
    case NEW_POST:
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case EDIT_POST:
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case DELETE_POST:
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case LIKE_POST:
      // const likedElementPos = state.results
      //   .map(x => {
      //     return x.id;
      //   })
      //   .indexOf(action.payload.results.id);

      // const updatedFromLike = state.results;
      // Updated post is in action.payload.results
      // updatedFromLike.splice(likedElementPos, 1, action.payload.results);

      // Return updated post
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case UNLIKE_POST:
      // const unlikedElementPos = state.results
      //   .map(x => {
      //     return x.id;
      //   })
      //   .indexOf(action.payload.results.id);

      // Remove reaction from current user from posts reactions array
      const filteredReactions = action.payload.results.reactions.filter(
        reaction => reaction.user.id !== action.payload.userId,
      );
      // Create new post with updated reactions
      const updatedPost = {
        ...action.payload.results,
        reactions: filteredReactions,
      };

      // const updatedFromUnliked = state.results;
      // updatedFromUnliked.splice(unlikedElementPos, 1, updatedPost);
      // // Create new posts array with other posts and updated post
      return {
        ...state,
        status: action.payload.status,
        results: updatedPost,
      };
    case COMMENT_POST:
      // // Get other posts that didn't have the reaction added
      // const filteredCommentPosts = state.results.filter(
      //   post => post.id !== action.payload.results.id,
      // );
      // Return posts array with updated post added (new comment is added in action created from response)
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case LIKE_COMMENT:
      // Add new reaction to comments array on post, return post and comment
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
        comment: {
          ...action.payload.comment,
          reactions: [
            ...action.payload.comment.reactions,
            action.payload.newReaction,
          ],
        },
      };
    case UNLIKE_COMMENT:
      // console.log('Payload ', action.payload);
      // Remove reaction from current user from comments reactions array
      const filteredReactionsToComment = action.payload.comment.reactions.filter(
        reaction => reaction.user.id !== action.payload.userId,
      );
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
        comment: {
          ...action.payload.comment,
          reactions: filteredReactionsToComment,
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        status: action.payload.status,
        results: action.payload.results,
      };
    default:
      return state;
  }
}
