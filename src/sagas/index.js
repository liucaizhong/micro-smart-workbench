import { all, call, put } from 'redux-saga/effects'
// import { setLoginUser } from '../actions/index'
import * as TYPES from '../actions/type'
import { getCookie } from '../util'

// get login info
function* setUser() {
  const userId = getCookie('userId') || 'sunjx'
  const userName = getCookie('userName') || '孙金霞'
  // 0: admin, 1: analyst, 2: sales
  const roleId = getCookie('roleId') || 1
  const groupId = getCookie('groupId') || 'zhanlue'

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
