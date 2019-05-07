import {
  CONVERSATIONS,
  NEW_CONVERSATION,
} from '../actions/conversations.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function conversations(state = initialState, action) {
  switch (action.type) {
    case CONVERSATIONS:
      return { ...state, ...action.payload };
    case NEW_CONVERSATION:
      return action.payload;
    default:
      return state;
  }
}
