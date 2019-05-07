import { SINGLE_POST } from '../actions/posts.actions';

// Initial state
const initialState = { status: 'pending' };

// Reducer
export default function singlePost(state = initialState, action) {
  switch (action.type) {
    case SINGLE_POST:
      return { ...state, ...action.payload };
    // case LIKE_POST:
    //   const filteredPosts = state.results.filter(
    //     post => post.id !== action.payload.results.id,
    //   );
    //   return {
    //     ...state,
    //     results: [action.payload.results, ...filteredPosts],
    //   };
    default:
      return state;
  }
}
