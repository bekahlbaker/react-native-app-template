import {
  postGetAll,
  postCreate,
  postUnlike,
  postLike,
  postDestroy,
  postGetSingle,
  postEdit,
  commentCreate,
  commentUnlike,
  commentLike,
  commentDestroy,
  commentEdit,
  postsFromGroup,
} from '../api/posts';

// Action constants
export const POSTS = 'POSTS';
export const NEW_POST = 'NEW_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const SINGLE_POST = 'SINGLE_POST';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const COMMENT_POST = 'COMMENT_POST';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// actions
// export function getAllPostsFromGroup(user, page) {
//   return async dispatch => {
//     try {
//       // For each group on user, check if active
//       // console.log('USER ', user);
//       const postsFromAllGroups = [];
//       let i;
//       for (i = 0; i < user.active_groups.length; i++) {
//         // console.log('GROUP ', user.active_groups[i].id);
//         if (user.active_groups[i].active) {
//           const response = await getAllPostsFromGroup(
//             user.active_groups[i].id,
//             page,
//           );
//           console.log('POSTS RESPONSE ', response);
//           postsFromAllGroups.push(response.id);
//         }
//         console.log('ALL POSTS ', postsFromAllGroups);
//       }
//       // If active, const response = await getAllPostsFromGroup(group.id)
//       // Spread push response.posts to array
//       // Dispatch to posts
//     } catch (err) {
//       console.log('ERROR GETTING ALL POSTS ', err);
//     }
//   };
// }

export function getAllPostsFromGroup(group, page) {
  // console.log('Page', page);
  return async dispatch => {
    try {
      const response = await postsFromGroup(group.id, page);

      // console.log('GET ALL POSTS FROM ONE GROUP', response);

      //

      if (response.posts) {
        dispatch({
          type: POSTS,
          payload: {
            status: `allCompleteFromGroup ${new Date()}`,
            results: response.posts,
            currentPage: response.meta.current_page,
            allPages: response.meta.total_pages,
          },
        });
      } else if (response.error) {
        dispatch({
          type: POSTS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting posts', error);
    }
  };
}

export function getAllPosts(page) {
  // console.log('Page', page);
  return async dispatch => {
    try {
      const response = await postGetAll(page);

      // console.log('GET ALL POSTS', response);

      //

      if (response.posts) {
        dispatch({
          type: POSTS,
          payload: {
            status: `allPostsForUser ${new Date()}`,
            results: response.posts,
            currentPage: response.meta.current_page,
            allPages: response.meta.total_pages,
          },
        });
      } else if (response.error) {
        dispatch({
          type: POSTS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting posts', error);
    }
  };
}

export function getSinglePost(postId) {
  return async dispatch => {
    try {
      const response = await postGetSingle(postId);

      // console.log('GET SINGLE POST', response);

      //

      if (response.post) {
        dispatch({
          type: SINGLE_POST,
          payload: {
            status: `singleComplete ${new Date()}`,
            results: response.post,
          },
        });
      } else if (response.error) {
        dispatch({
          type: SINGLE_POST,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting single post', error);
    }
  };
}

export function createPost(formdata) {
  // console.log(formdata);
  return async dispatch => {
    try {
      const response = await postCreate(formdata);

      console.log('CREATE POST', response);

      //

      if (response.post) {
        dispatch({
          type: NEW_POST,
          payload: {
            status: `newPost ${response.post.id}`,
            results: response.post,
            error: null,
          },
        });
      } else if (response.error) {
        dispatch({
          type: NEW_POST,
          payload: {
            status: 'failed',
            error: response.error,
            results: null,
          },
        });
      }
    } catch (error) {
      // console.log('Error creating post', error);
    }
  };
}

export function editPost(post, formdata) {
  // console.log('EDIT POST ACTIONS ', post, formdata);
  return async dispatch => {
    try {
      const response = await postEdit(post.id, formdata);

      // console.log('EDIT POST', response);

      if (response.post) {
        dispatch({
          type: EDIT_POST,
          payload: {
            status: `editPost ${new Date()}`,
            results: response.post,
            error: null,
          },
        });
      } else if (response.error) {
        dispatch({
          type: EDIT_POST,
          payload: {
            status: 'failed',
            error: response.error,
            results: null,
          },
        });
      }
    } catch (error) {
      // console.log('Error editing post', error);
    }
  };
}

export function likePost(post) {
  return async dispatch => {
    try {
      const response = await postLike(post.id);

      // console.log('LIKE POST', response);

      //

      if (response.reaction) {
        dispatch({
          type: LIKE_POST,
          payload: {
            status: `likePost${post.id}`,
            results: {
              ...post,
              reactions: [...post.reactions, response.reaction],
            },
          },
        });
      } else if (response.error) {
        dispatch({
          type: LIKE_POST,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error liking post', error);
    }
  };
}

export function unlikePost(post, userId) {
  return async dispatch => {
    try {
      const response = await postUnlike(post.id);

      // console.log('UNLIKE POST', response);

      //

      if (response.message === 'success') {
        dispatch({
          type: UNLIKE_POST,
          payload: {
            status: `unlikePost${post.id}`,
            results: post,
            userId,
          },
        });
      } else if (response.error) {
        dispatch({
          type: UNLIKE_POST,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error unliking post', error);
    }
  };
}

export function destroyPost(post) {
  return async dispatch => {
    try {
      const response = await postDestroy(post.id);

      // console.log('DELETE POST', response);

      //

      if (response.message === 'success') {
        dispatch({
          type: DELETE_POST,
          payload: { status: `deletePost ${new Date()}`, results: post },
        });
      } else if (response.error) {
        dispatch({
          type: DELETE_POST,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error deleting post', error);
    }
  };
}

// COMMENTS

export function createComment(post, content) {
  return async dispatch => {
    try {
      const response = await commentCreate(post.id, content);

      // console.log('CREATE COMMENT', response);

      //

      if (response.comment) {
        dispatch({
          type: COMMENT_POST,
          payload: {
            status: `singleComplete ${new Date()}`,
            results: {
              ...post,
              comments: [...post.comments, response.comment],
            },
          },
        });
      } else if (response.error) {
        dispatch({
          type: COMMENT_POST,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error creating comment', error);
    }
  };
}

export function editComment(postId, comment, content) {
  return async dispatch => {
    try {
      const response = await commentEdit(postId, comment.id, content);

      // console.log('EDIT COMMENT', response);

      //

      if (response === true) {
        dispatch({
          type: EDIT_COMMENT,
          payload: {
            status: `editComment ${new Date()}`,
            results: { ...comment, content },
          },
        });
      } else if (response.error) {
        dispatch({
          type: EDIT_COMMENT,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error editing comment', error);
    }
  };
}

export function likeComment(post, comment) {
  return async dispatch => {
    try {
      const response = await commentLike(post.id, comment.id);

      // console.log('LIKE COMMENT', response);

      //

      if (response.reaction) {
        dispatch({
          type: LIKE_COMMENT,
          payload: {
            status: `likeComment ${new Date()}`,
            results: {
              ...post,
            },
            comment,
            newReaction: response.reaction,
          },
        });
      } else if (response.error) {
        dispatch({
          type: LIKE_COMMENT,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error liking comment', error);
    }
  };
}

export function unlikeComment(post, comment, userId) {
  return async dispatch => {
    try {
      const response = await commentUnlike(post.id, comment.id);

      // console.log('UNLIKE COMMENT', response);

      if (response.message === 'success') {
        dispatch({
          type: UNLIKE_COMMENT,
          payload: {
            status: `unlikeComment ${new Date()}`,
            results: {
              ...post,
            },
            comment,
            userId,
          },
        });
      } else if (response.error) {
        dispatch({
          type: UNLIKE_COMMENT,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error unliking comment', error);
    }
  };
}

export function destroyComment(postId, commentId) {
  return async dispatch => {
    try {
      const response = await commentDestroy(postId, commentId);

      // console.log('DELETE COMMENT', response);

      //

      if (response.message === 'success') {
        dispatch({
          type: DELETE_COMMENT,
          payload: { status: `destroyComment ${new Date()}`, results: [] },
        });
      } else if (response.error) {
        dispatch({
          type: DELETE_COMMENT,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error deleting comment', error);
    }
  };
}
