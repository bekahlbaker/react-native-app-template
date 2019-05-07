export const MESSAGE_INDICATOR = 'MESSAGE_INDICATOR';

// Need to set a login type when login action is sent
// This prevents navigation from navigating to signed in several times

export function setMessageIndicator(shouldShow) {
  return dispatch => {
    dispatch({
      type: MESSAGE_INDICATOR,
      payload: { shouldShow, updatedAt: new Date() },
    });
  };
}
