import { SET_LOGIN_TYPE } from '../actions/loginType.actions';

export default function(state = null, action) {
  switch (action.type) {
    default:
      return state;
    case SET_LOGIN_TYPE:
      return action.payload;
  }
}
