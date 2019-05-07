import {
  getAll,
  getAvailable,
  mark,
  register,
  editBadge,
  editToken,
  deleteDevice,
} from '../api/notifications';
import { saveDeviceInfo } from '../../util/helpers';
import SInfo from 'react-native-sensitive-info';

// Action constants
export const NOTIFICATIONS = 'NOTIFICATIONS';
export const MARK_READ = 'MARK_READ';
export const AVAILABLE_NOTIFICATIONS = 'AVAILABLE_NOTIFICATIONS';
export const REGISTERED_DEVICE = 'REGISTERED_DEVICE';

// actions
export function getAllNotifications(userId, page) {
  return async dispatch => {
    // dispatch({
    //   type: NOTIFICATIONS,
    //   payload: {
    //     status: `pending`,
    //     results: null,
    //     currentPage: 1,
    //     allPages: 1,
    //   },
    // });
    try {
      const response = await getAll(userId, page);

      // console.log('GET ALL NOTIFICATIONS', response);

      if (response.notifications) {
        dispatch({
          type: NOTIFICATIONS,
          payload: {
            status: `allComplete ${new Date()}`,
            results: [...response.notifications],
            currentPage: response.meta.current_page,
            allPages: response.meta.total_pages,
          },
        });
      } else if (response.error) {
        dispatch({
          type: NOTIFICATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting all notifications', error);
    }
  };
}

export function getAvailableNotifications() {
  return async dispatch => {
    try {
      const response = await getAvailable();

      // console.log('GET AVAILABLE NOTIFICATIONS', response);

      if (!response.error) {
        dispatch({
          type: AVAILABLE_NOTIFICATIONS,
          payload: {
            status: `availableComplete ${new Date()}`,
            results: response,
          },
        });
      } else {
        dispatch({
          type: AVAILABLE_NOTIFICATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting available notifications', error);
    }
  };
}

export function markNotificationRead(notifId) {
  return async dispatch => {
    try {
      const response = await mark(notifId);

      // console.log('MARK NOTIF READ', response);

      if (response.notification) {
        dispatch({
          type: MARK_READ,
          payload: {
            status: `markRead ${new Date()}`,
            results: response.notification,
          },
        });
      } else if (response.error) {
        dispatch({
          type: MARK_READ,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error marking notif as read', error);
    }
  };
}

export function registerDevice(type, deviceToken) {
  // console.log('REGISTER DEVICE ACTIONS ', type, deviceToken);
  return async dispatch => {
    try {
      const response = await register(type, deviceToken);

      // console.log('REGISTER DEVICE', response);

      if (response.device) {
        saveDeviceInfo(response.device.id, response.device.device_token);
        dispatch({
          type: REGISTERED_DEVICE,
          payload: {
            status: `registeredDevice ${new Date()}`,
            results: response.device,
          },
        });
      } else if (response.error) {
        dispatch({
          type: REGISTERED_DEVICE,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error marking notif as read', error);
    }
  };
}

export function editBadgeCount(type, badgeCount) {
  return async dispatch => {
    try {
      const response = await editBadge(type, badgeCount);

      // console.log('EDIT DEVICE ', response);

      if (response.device) {
        saveDeviceInfo(response.device.id, response.device.device_token);
        dispatch({
          type: REGISTERED_DEVICE,
          payload: {
            status: `editBadgeCount ${new Date()}`,
            results: response.device,
          },
        });
      } else if (response.error) {
        dispatch({
          type: REGISTERED_DEVICE,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error marking notif as read', error);
    }
  };
}

export function editDeviceToken(type, deviceToken) {
  return async dispatch => {
    try {
      const response = await editToken(type, deviceToken);

      // console.log('EDIT DEVICE ', response);

      if (response.device) {
        saveDeviceInfo(response.device.id, response.device.device_token);
        dispatch({
          type: REGISTERED_DEVICE,
          payload: {
            status: `editDevice ${new Date()}`,
            results: response.device,
          },
        });
      } else if (response.error) {
        dispatch({
          type: REGISTERED_DEVICE,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error marking notif as read', error);
    }
  };
}

export function deleteDeviceId() {
  return async dispatch => {
    try {
      const response = await deleteDevice();

      // console.log('DELETE DEVICE ', response);

      if (response.message === 'success') {
        SInfo.setItem('hasPostedDeviceToken', null, {});
        dispatch({
          type: REGISTERED_DEVICE,
          payload: {
            status: `deleteDevice ${new Date()}`,
          },
        });
      } else if (response.error) {
        dispatch({
          type: REGISTERED_DEVICE,
          payload: { status: 'failed' },
        });
      }
    } catch (error) {
      // console.log('Error marking notif as read', error);
    }
  };
}
