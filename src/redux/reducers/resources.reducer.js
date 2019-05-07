import { RESOURCES } from '../actions/resources.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function resources(state = initialState, action) {
  switch (action.type) {
    case RESOURCES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
