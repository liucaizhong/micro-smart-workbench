import { combineReducers } from 'redux'
import loginUser from './loginUser'
import commissionCond from './commissionCond'

const rootReducer = combineReducers({
  loginUser,
  commissionCond,
})

export default rootReducer
