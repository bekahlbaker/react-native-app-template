import { SELECTED_TAB } from '../actions/tabBar.actions';

const initialState = { selectedTab: 'MainFeed' };

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case SELECTED_TAB:
      return action.payload;
  }
}
