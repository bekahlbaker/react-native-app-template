import {
  GROUPS,
  SINGLE_GROUP,
  CLEAR_GROUP,
  ADD_TO_GROUP,
  ASSIGN_ADMIN,
  CREATE_GROUP,
  LEAVE_GROUP,
} from '../actions/groups.actions';
// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function groups(state = initialState, action) {
  switch (action.type) {
    case GROUPS:
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
    case LEAVE_GROUP:
      return action.payload;
    case CREATE_GROUP:
      return action.payload;
    case SINGLE_GROUP:
      return action.payload;
    case CLEAR_GROUP:
      return action.payload;
    case ADD_TO_GROUP:
      return action.payload;
    case ASSIGN_ADMIN:
      return action.payload;
    default:
      return state;
  }
}
