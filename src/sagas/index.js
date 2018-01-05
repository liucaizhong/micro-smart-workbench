import { all, call, put } from 'redux-saga/effects'
// import { setLoginUser } from '../actions/index'
import * as TYPES from '../actions/type'
import { getCookie } from '../util'

// get login info
function* setUser() {
  const userId = getCookie('userId')// || 'zhuxiaoyan'
  const userName = getCookie('userName')// || '朱晓燕'
  // 0: admin, 1: analyst, 2: sales
  const roleId = getCookie('roleId')// || 0
  const groupId = getCookie('groupId')// || '1005'

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
