import { getToken } from '../../helpers/utility';

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => {
    return (dispatch, getState, http) => {
      const token = getToken().get('idToken');
      if (token) {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          token
        });
      }
    }
  },
  // ({ type: actions.CHECK_AUTHORIZATION }),
  login: (user) => {
    return (dispatch, getState, http) => {
      http.post('/auth/login', {
        email: user.username,
        password: user.password
      })
      .then(function (response) {
        console.log(response);
        localStorage.setItem('id_token', response.data.accessToken);
        dispatch({
          type: actions.LOGIN_SUCCESS,
          token: response.data.accessToken
        })
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actions.LOGIN_ERROR
        })
      });
    };
  },
  logout: () => ({
    type: actions.LOGOUT
  })
};
export default actions;
