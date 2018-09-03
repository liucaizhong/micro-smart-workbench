import { all, call, put } from 'redux-saga/effects'
// import { setLoginUser } from '../actions/index'
import * as TYPES from '../actions/type'
import { getCookie } from '../util'

// get login info
function* setUser() {
  const userId = getCookie('userId') || 'zhanghuina'
  const userName = getCookie('userName') || ''
  // 0: admin, 1: analyst, 2: sales
  const roleId = getCookie('roleId') || 2
  const groupId = getCookie('groupId')

  yield put({
    type: TYPES.SET_LOGIN_USER,
    user: {
      userId,
      userName,
      roleId,
      groupId,
    },
  })
}

export default function* rootSaga() {
  yield all([
    call(setUser),
  ])
}
