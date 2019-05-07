import { CATEGORIES } from '../actions/categories.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function categories(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
