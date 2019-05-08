export const BASE_URL = `https://cratebind.com/api/v1`;

// CONVERSATIONS
export const GET_ALL_CONVERSATIONS = (
  organizationId,
  page,
) => `${BASE_URL}/conversations?organization_id=${organizationId}&page=${page ||
  1}&per=20
`;
export const CREATE_CONVERSATION = `${BASE_URL}/conversations`;
export const GET_SINGLE_CONVERSATION = convoId =>
  `${BASE_URL}/conversations/${convoId}`;
export const MARK_CONVERSATION_READ = id =>
  `${BASE_URL}/conversations/${id}/mark_read`;
export const POST_MESSAGE_TO_CONVERSATION = convoId =>
  `${BASE_URL}/conversations/${convoId}/messages`;
export const DELETE_CONVERSATION = convoId =>
  `${BASE_URL}/conversations/${convoId}`;

// DEVICES
export const REGISTER_DEVICE = `${BASE_URL}/devices`;
export const EDIT_DEVICE = deviceId => `${BASE_URL}/devices/${deviceId}`;
export const DELETE_DEVICE = deviceId => `${BASE_URL}/devices/${deviceId}`;

// NOTIFICATIONS
export const GET_ALL_NOTIFICATIONS = (userId, page) =>
  `${BASE_URL}/users/${userId}/notifications?page=${page || 1}&per=20`;
export const GET_AVAILABLE_NOTIFICATIONS = `${BASE_URL}/notifications/available_notifications`;
export const MARK_NOTIFICATION_READ = notifId =>
  `${BASE_URL}/notifications/${notifId}/mark_read`;

// POSTS
export const GET_ALL_POSTS_FROM_GROUP = (groupId, page) =>
  `${BASE_URL}/groups/${groupId}/posts?page=${page || 1}&per=20`;
export const GET_ALL_POSTS = (organizationId, page) =>
  `${BASE_URL}/posts?organization_id=${organizationId}&page=${page ||
    1}&per=20`;
export const CREATE_POST = `${BASE_URL}/posts`;
export const UNLIKE_POST = postId => `${BASE_URL}/posts/${postId}/unlike`;
export const LIKE_POST = postId => `${BASE_URL}/posts/${postId}/like`;
export const DELETE_POST = postId => `${BASE_URL}/posts/${postId}`;
export const GET_SINGLE_POST = postId => `${BASE_URL}/posts/${postId}`;
export const EDIT_POST = postId => `${BASE_URL}/posts/${postId}`;
// comments on posts
export const CREATE_COMMENT_ON_POST = postId =>
  `${BASE_URL}/posts/${postId}/comments`;
export const UNLIKE_COMMENT_ON_POST = (postId, commentId) =>
  `${BASE_URL}/posts/${postId}/comments/${commentId}/unlike`;
export const LIKE_COMMENT_ON_POST = (postId, commentId) =>
  `${BASE_URL}/posts/${postId}/comments/${commentId}/like`;
export const DELETE_COMMENT_ON_POST = (postId, commentId) =>
  `${BASE_URL}/posts/${postId}/comments/${commentId}`;
export const EDIT_COMMENT_ON_POST = (postId, commentId) =>
  `${BASE_URL}/posts/${postId}/comments/${commentId}`;

// USERS
export const SIGN_UP = `${BASE_URL}/users/sign_up`;
export const SIGN_IN = `${BASE_URL}/users/sign_in`;
export const SIGN_OUT = `${BASE_URL}/users/sign_out`;
export const FORGOT_PASSWORD = `${BASE_URL}/users/forgot_password`;
export const UPDATE_PROFILE = userId => `${BASE_URL}/users/${userId}`;
export const GET_CURRENT_USER = `${BASE_URL}/users`;
export const GET_SINGLE_USER = userId => `${BASE_URL}/users/${userId}`;
export const GET_NOTIFICATIONS_FOR_USER = (userId, page) =>
  `${BASE_URL}/users/${userId}/notifications?page=${page || 1}&per=20`;
export const TOGGLE_NOTIFICATION = userId =>
  `${BASE_URL}/users/${userId}/toggle_notifications`;
