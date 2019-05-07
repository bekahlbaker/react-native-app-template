// Add auth token to all authorization headers
import {
  GET_ALL_CONVERSATIONS,
  CREATE_CONVERSATION,
  GET_SINGLE_CONVERSATION,
  MARK_CONVERSATION_READ,
  POST_MESSAGE_TO_CONVERSATION,
  DELETE_CONVERSATION,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const get = async page => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_ALL_CONVERSATIONS(orgId, page), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const create = async formdata => {
  const orgId = await SInfo.getItem('defaultOrgId', {});
  const token = await SInfo.getItem('authToken', {});
  formdata.append('organization_id', parseInt(orgId));
  // console.log(formdata);

  const response = await fetch(CREATE_CONVERSATION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: formdata,
  });
  // console.log(response);
  return response.json();
};

export const getSingle = async convoId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_SINGLE_CONVERSATION(convoId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const mark = async convoId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(MARK_CONVERSATION_READ(convoId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const post = async (convoId, content) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(POST_MESSAGE_TO_CONVERSATION(convoId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      content,
    }),
  });
  // console.log(response);
  return response.json();
};

export const deleteConv = async convoId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(DELETE_CONVERSATION(convoId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};
