const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOGIN_USER':
      return action.user
    default:
      return state
  }
}

export default loginUser
