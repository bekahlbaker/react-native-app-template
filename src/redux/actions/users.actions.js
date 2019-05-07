import { saveInfo } from '../../util/helpers';
import {
  signUp,
  emailAuth,
  forgotPassword,
  signOut,
  get,
  getSingle,
  toggle,
  update,
} from '../api/users';

// Action constants
export const AUTHORIZED_USER = 'AUTHORIZED_USER';
export const NOTIFICATIONS = 'NOTIFCATIONS';
export const OTHER_USER = 'OTHER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// actions
export function createUser(credentials) {
  return async dispatch => {
    dispatch({
      type: AUTHORIZED_USER,
      payload: { auth: 'pending', error: '' },
    });

    const { password, email } = credentials;

    try {
      const response = await signUp(credentials);

      // console.log('Sign Up User ', response);
      if (response.user) {
        saveInfo(
          response.user.auth_token,
          password,
          email,
          `${response.user.organization_ids[0]}`,
        );
        // dispatch the user
        // Crashlytics.setUserEmail(response.user.email);
        // Answers.logLogin("EmailLogin", true, { User: response.user.email });
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: `complete ${new Date()}`, ...response.user },
        });
      } else if (response.error) {
        if (response.error.email) {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error: 'That email has been taken. Do you need to sign in?',
            },
          });
        } else {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error: response.error,
            },
          });
        }
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

export function signInUser(email, password) {
  return async dispatch => {
    dispatch({
      type: AUTHORIZED_USER,
      payload: { auth: 'pending', error: '' },
    });
    try {
      const response = await emailAuth(email, password);

      // console.log('Email Auth User ', response);
      if (response.user) {
        saveInfo(
          response.user.auth_token,
          password,
          email,
          `${response.user.organization_ids[0]}`,
        );
        // dispatch the user
        // Crashlytics.setUserEmail(response.user.email);
        // Answers.logLogin("EmailLogin", true, { User: response.user.email });
        dispatch({
          type: AUTHORIZED_USER,
          payload: {
            auth: `emailAuthComplete ${new Date()}`,
            ...response.user,
            error: '',
            message: '',
          },
        });
      } else if (response.error) {
        if (response.error.email) {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error:
                "That email doesn't seem to exist. Do you need to create a new account?",
            },
          });
        } else if (response.error.password) {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error:
                "That's not the right password. Do you need to reset your password?",
            },
          });
        } else {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error: response.error,
            },
          });
        }
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

/*
forgotPassword() sends email to API
Params -
email: An object containing email of user
*/
export function sendPassword(email) {
  return async dispatch => {
    dispatch({
      type: AUTHORIZED_USER,
      payload: { auth: 'pending' },
    });
    try {
      const response = await forgotPassword(email);

      if (response.message) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: 'complete', ...response, error: '' },
        });
      } else if (response.error) {
        if (response.error.email) {
          dispatch({
            type: AUTHORIZED_USER,
            payload: {
              auth: 'failed',
              error: response.error.email[0],
            },
          });
        }
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

export function signUserOut() {
  return async dispatch => {
    try {
      const response = await signOut();

      if (response.message) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: 'complete', ...response, error: '' },
        });
      } else if (response.error) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: {
            auth: 'failed',
            error: response.error,
            message: '',
          },
        });
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

export function getCurrentUser() {
  return async dispatch => {
    try {
      const response = await get();

      // console.log('GET CURRENT USER', response);
      if (response.user) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: `getUserComplete ${new Date()}`, ...response.user },
        });
      } else if (response.error) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: 'failed', error: response.error },
        });
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

export function getSingleUser(userId) {
  return async dispatch => {
    try {
      const response = await getSingle(userId);

      // console.log('GET OTHER USERS PROFILE', response);
      if (response.user) {
        dispatch({
          type: OTHER_USER,
          payload: { auth: 'complete', ...response.user },
        });
      } else if (response.error) {
        dispatch({
          type: OTHER_USER,
          payload: { auth: 'failed', error: response.error },
        });
      }
    } catch (error) {
      // console.log('Error signing up ', error);
    }
  };
}

export function toggleNotification(user, notification) {
  // console.log('TOGGLE : ', user.id, notification);
  return async dispatch => {
    try {
      const response = await toggle(user.id, notification);

      // console.log('TOGGLE NOTIFICATIONS ', response);
      if (response.user) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: `toggle ${new Date()}`, ...response.user },
        });
      } else if (response.error) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: 'failed', error: response.error },
        });
      }
    } catch (error) {
      // console.log('Error getting notifications', error);
    }
  };
}

export function updateUserProfile(userId, formData) {
  return async dispatch => {
    try {
      const response = await update(userId, formData);

      if (response.user) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: `update ${new Date()}`, ...response.user },
        });
      } else if (response.error) {
        dispatch({
          type: AUTHORIZED_USER,
          payload: { auth: 'failed', error: response.error },
        });
      }
    } catch (error) {
      // console.log('Error getting notifications', error);
    }
  };
}
