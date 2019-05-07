import {
  GET_ALL_GROUPS,
  CREATE_GROUP,
  LEAVE_GROUP,
  ADD_TO_GROUP,
  REQUEST_TO_JOIN_GROUP,
  GET_SINGLE_GROUP,
  EDIT_GROUP,
  ASSIGN_GROUP_ADMIN,
  ACCEPT_REQUEST,
  REMOVE_USER,
  REQUEST_TO_ADD_USER_TO_GROUP,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const getAll = async page => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_ALL_GROUPS(parseInt(orgId), page), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const getSingle = async groupId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_SINGLE_GROUP(groupId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const create = async (formdata, users) => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  formdata.append('organization_id', parseInt(orgId));
  // console.log('CREATE GROUP WITH USERS URL ', CREATE_GROUP(users));
  const response = await fetch(CREATE_GROUP(users), {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formdata,
  });
  // console.log('form data ', formdata);
  console.log('response ', response);
  return response.json();
};

export const leave = async groupId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(LEAVE_GROUP(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const add = async (groupId, userId, isAdmin) => {
  // console.log(groupId, userId, isAdmin);
  // console.log(ADD_TO_GROUP(groupId));
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(ADD_TO_GROUP(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: userId,
      is_admin: isAdmin,
    }),
  });
  // console.log(response);
  return response.json();
};

export const request = async groupId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(REQUEST_TO_JOIN_GROUP(groupId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const requestOtherUser = async (groupId, userId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(REQUEST_TO_ADD_USER_TO_GROUP(groupId, userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const accept = async (groupId, userId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(ACCEPT_REQUEST(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });
  return response.json();
};

export const remove = async (groupId, userId) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(REMOVE_USER(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });
  return response.json();
};

export const assign = async (groupId, userId) => {
  const token = await SInfo.getItem('authToken', {});
  // console.log('URL ', ASSIGN_GROUP_ADMIN(groupId));
  const response = await fetch(ASSIGN_GROUP_ADMIN(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });
  // console.log(response);
  return response.json();
};

export const edit = async (groupId, formdata) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(EDIT_GROUP(groupId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: formdata,
  });
  return response.json();
};
