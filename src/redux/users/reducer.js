import actions from './actions';

const initState = {};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_USERS:
      if (action.payload && action.payload.data && !action.payload.data.error) {
        return action.payload.data
      }
      break
    default:
      return state;
  }
}
