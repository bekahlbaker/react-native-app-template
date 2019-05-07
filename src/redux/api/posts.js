// Add auth token to all authorization headers
import {
  GET_ALL_POSTS_FROM_GROUP,
  GET_ALL_POSTS,
  CREATE_POST,
  UNLIKE_POST,
  LIKE_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  EDIT_POST,
  CREATE_COMMENT_ON_POST,
  UNLIKE_COMMENT_ON_POST,
  LIKE_COMMENT_ON_POST,
  DELETE_COMMENT_ON_POST,
  EDIT_COMMENT_ON_POST,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const postsFromGroup = async (groupId, page) => {
  const token = await SInfo.getItem('authToken', {});
  // console.log('URL ', GET_ALL_POSTS_FROM_GROUP(groupId, page));
  const response = await fetch(GET_ALL_POSTS_FROM_GROUP(groupId, page), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const postGetAll = async page => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  // console.log('GET POSTS URL ', GET_ALL_POSTS(parseInt(orgId)));
  // console.log('Token ', token);
  const response = await fetch(GET_ALL_POSTS(parseInt(orgId), page), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const postGetSingle = async postId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_SINGLE_POST(postId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const postCreate = async formdata => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  formdata.append('organization_id', parseInt(orgId));

  const response = await fetch(CREATE_POST, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formdata,
  });
  // console.log(response);
  return response.json();
};

export const postEdit = async (postId, formdata) => {
  // console.log('EDIT POST', postId, formdata);
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(EDIT_POST(postId), {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: formdata,
  });
  // console.log(response);
  return response.json();
};

export const postLike = async postId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(LIKE_POST(postId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const postUnlike = async postId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(UNLIKE_POST(postId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const postDestroy = async postId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(DELETE_POST(postId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

// COMMENTS

export const commentCreate = async (postId, content) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(CREATE_COMMENT_ON_POST(postId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      content,
    }),
  });
  return response.json();
};

export const commentEdit = async (postId, commentId, content) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(EDIT_COMMENT_ON_POST(postId, commentId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      content,
    }),
  });
  return response.json();
};

export const commentLike = async (postId, commentId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(LIKE_COMMENT_ON_POST(postId, commentId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const commentUnlike = async (postId, commentId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(UNLIKE_COMMENT_ON_POST(postId, commentId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const commentDestroy = async (postId, commentId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(DELETE_COMMENT_ON_POST(postId, commentId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};
