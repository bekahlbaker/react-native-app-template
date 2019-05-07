// Add auth token to all authorization headers
import {
  GET_ALL_NOTIFICATIONS,
  GET_AVAILABLE_NOTIFICATIONS,
  MARK_NOTIFICATION_READ,
  REGISTER_DEVICE,
  EDIT_DEVICE,
  DELETE_DEVICE,
} from '../../constants/urls';
import SInfo from 'react-native-sensitive-info';

export const getAll = async (userId, page) => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_ALL_NOTIFICATIONS(userId, page), {
    headers: {
      Authorization: token,
    },
  });
  // console.log(response);
  return response.json();
};

export const mark = async notifId => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(MARK_NOTIFICATION_READ(notifId), {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

export const getAvailable = async () => {
  const token = await SInfo.getItem('authToken', {});
  const response = await fetch(GET_AVAILABLE_NOTIFICATIONS, {
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};

// DEVICES

export const register = async (type, deviceToken) => {
  const token = await SInfo.getItem('authToken', {});
  // console.log('AUTH TOKEN ', token);
  // console.log('URL ', REGISTER_DEVICE);
  const response = await fetch(REGISTER_DEVICE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      is_type: type,
      device_token: deviceToken,
    }),
  });
  return response.json();
};

export const editBadge = async (type, badgeCount) => {
  const token = await SInfo.getItem('authToken', {});
  const deviceId = await SInfo.getItem('deviceId', {});
  const deviceToken = await SInfo.getItem('deviceToken', {});
  const response = await fetch(EDIT_DEVICE(parseInt(deviceId)), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      is_type: type,
      device_token: deviceToken,
      notification_count: badgeCount,
    }),
  });
  return response.json();
};

export const editToken = async (type, deviceToken) => {
  const token = await SInfo.getItem('authToken', {});
  const deviceId = await SInfo.getItem('deviceId', {});
  // const deviceToken = await SInfo.getItem('deviceToken', {});
  const response = await fetch(EDIT_DEVICE(parseInt(deviceId)), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      is_type: type,
      device_token: deviceToken,
    }),
  });
  return response.json();
};

export const deleteDevice = async () => {
  const token = await SInfo.getItem('authToken', {});
  const deviceId = await SInfo.getItem('deviceId', {});
  const response = await fetch(DELETE_DEVICE(parseInt(deviceId)), {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  return response.json();
};
