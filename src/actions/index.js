// import action types
import * as TYPES from './type'

// define factory function for generating action creator
function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[arg] = args[index]
    })
    return action
  }
}

// set login user
export const setLoginUser = makeActionCreator(TYPES.SET_LOGIN_USER, 'user')
// set search cond for commission
export const setCommissionCond = makeActionCreator(
  TYPES.SET_COMMISSION_COND,
  'commissionCond',
)
