import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({ idToken: null, user: null });

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('idToken', action.token);
    case actions.LOGOUT:
      return initState;
    case actions.GET_CURRENT_USER:
      return state.set('user', action.payload);
    default:
      return state;
  }
}
