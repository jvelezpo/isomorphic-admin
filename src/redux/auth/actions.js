import { getToken, clearToken } from '../../helpers/utility';

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  checkAuthorization: () => {
    return (dispatch, getState, http) => {
      const token = getToken().get('idToken');
      if (token) {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          token
        });
        dispatch(actions.getCurrentUser());
      }
    }
  },
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
      .then(() => {
        return dispatch(actions.getCurrentUser());
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actions.LOGIN_ERROR
        })
      });
    };
  },
  logout: () => {
    return (dispatch, getState, http) => {
      clearToken();
      dispatch({
        type: actions.LOGOUT
      });
    }
  },
  getCurrentUser: () => {
    return (dispatch, getState, http) => {
      return http({
        method: 'GET',
        url: '/users/me'
      })
        .then(response => {
          console.log('getCurrentUser', response);
          return dispatch({
            type: actions.GET_CURRENT_USER,
            payload: response.data
          });
        })
        .catch(err => {
          console.log('ERRRO getCurrentUser', err);
          return dispatch(actions.logout());
        });
    };
  }
};
export default actions;
