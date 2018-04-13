import actions from './actions';

const initState = {};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_USERS:
      if (action.payload && action.payload.data && !action.payload.data.error) {
        action.payload.data.docs.forEach((d, i) => d.key = i)
        return action.payload.data
      }
      break
    default:
      return state;
  }
}
