import { MESSAGE_INDICATOR } from '../actions/messageIndicator.actions';

const initialState = { shouldShow: false };

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case MESSAGE_INDICATOR:
      return action.payload;
  }
}
