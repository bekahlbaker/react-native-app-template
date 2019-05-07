import {
  NOTIFICATIONS,
  MARK_READ,
  AVAILABLE_NOTIFICATIONS,
  REGISTERED_DEVICE,
} from '../actions/notifications.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function notifications(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS:
      if (action.payload.currentPage !== 1) {
        return {
          status: action.payload.status,
          results: [...state.results, ...action.payload.results],
          currentPage: action.payload.currentPage,
          allPages: action.payload.allPages,
        };
      } else {
        return { ...state, ...action.payload };
      }
    case MARK_READ:
      return action.payload;
    case AVAILABLE_NOTIFICATIONS:
      return action.payload;
    case REGISTERED_DEVICE:
      return action.payload;
    default:
      return state;
  }
}
