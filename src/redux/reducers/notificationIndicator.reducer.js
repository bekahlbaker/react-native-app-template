import { NOTIFICATION_INDICATOR } from '../actions/notificationIndicator.actions';

const initialState = { shouldShow: false };

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case NOTIFICATION_INDICATOR:
      return action.payload;
  }
}
