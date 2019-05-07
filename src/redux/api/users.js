import {
  SIGN_UP,
  SIGN_IN,
  FORGOT_PASSWORD,
  SIGN_OUT,
  UPDATE_PROFILE,
  GET_CURRENT_USER,
  GET_SINGLE_USER,
  GET_NOTIFICATIONS_FOR_USER,
  TOGGLE_NOTIFICATION,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const signUp = async ({
  organization_id,
  organization_name,
  organization_url,
  organization_phone,
  first_name,
  last_name,
  email,
  password,
}) => {
  const response = await fetch(SIGN_UP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organization_id,
      organization_name,
      organization_url,
      organization_phone,
      first_name,
      last_name,
      email,
      password,
    }),
  });
  return response.json();
};

export const emailAuth = async (email, password) => {
  // console.log('CALLING SIGN IN ');
  const response = await fetch(SIGN_IN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(SIGN_OUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const forgotPassword = async email => {
  const response = await fetch(FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  return response.json();
};

export const get = async () => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_CURRENT_USER, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const getSingle = async userId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_SINGLE_USER(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const getNotifications = async userId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_NOTIFICATIONS_FOR_USER(userId), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return response.json();
};

export const toggle = async (userId, notification) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(TOGGLE_NOTIFICATION(userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      notification_name: `${notification}`,
    }),
  });
  return response.json();
};

export const update = async (userId, formData) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(UPDATE_PROFILE(userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: formData,
  });
  return response.json();
};
