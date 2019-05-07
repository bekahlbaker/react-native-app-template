export const NOTIFICATION_INDICATOR = 'NOTIFICATION_INDICATOR';

// Need to set a login type when login action is sent
// This prevents navigation from navigating to signed in several times

export function setNotificationIndicator(shouldShow) {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_INDICATOR,
      payload: { shouldShow, updatedAt: new Date() },
    });
  };
}
