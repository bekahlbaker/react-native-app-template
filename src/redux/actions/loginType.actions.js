export const SET_LOGIN_TYPE = 'SET_LOGIN_TYPE';

// Need to set a login type when login action is sent
// This prevents navigation from navigating to signed in several times

export function setLoginType(type) {
  return dispatch => {
    dispatch({
      type: SET_LOGIN_TYPE,
      payload: type,
    });
  };
}
