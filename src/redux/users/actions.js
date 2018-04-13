const actions = {
  GET_USERS: 'GET_USERS',
  getUsers: (page = 0, limit = 30) => {
    return (dispatch, getState, http) => {
      let url = `/admin/users?page=${page}&limit=${limit}`
      const request = http.get(url)
  
      return request.then(response => {
        return dispatch({
          type: actions.GET_USERS,
          payload: response
        })
      })
    }
  }
}
export default actions;
