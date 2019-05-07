import { OTHER_USER } from '../actions/users.actions';

// Initial state
const initialState = { auth: 'failed', error: '', message: '' };

// Reducer
export default function user(state = initialState, action) {
  switch (action.type) {
    case OTHER_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
