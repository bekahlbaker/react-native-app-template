import { ORGANIZATIONS } from '../actions/organizations.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function organizations(state = initialState, action) {
  switch (action.type) {
    case ORGANIZATIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
