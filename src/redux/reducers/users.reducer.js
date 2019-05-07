import { AUTHORIZED_USER, LOGOUT_USER } from '../actions/users.actions';

// Initial state
const initialState = { auth: 'failed', error: '' };

// Reducer
export default function user(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZED_USER:
      return { ...state, ...action.payload };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
}
