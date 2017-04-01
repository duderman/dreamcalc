import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Map } from 'immutable'
import Api from 'api'

const initialState = Map({ email: '', valid: true, checking: false })

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return currentState.merge({ email: action.email, valid: true, checking: false })
    case LOGIN_FAILED:
      return currentState.merge({ valid: false, checking: false })
    case LOGIN_REQUESTED:
      return currentState.merge({ valid: false, checking: true })
    default:
      return currentState
  }
}

const logined = (email) => ({ type: LOGIN_SUCCESS, email })
const loginError = () => ({ type: LOGIN_FAILED })

export const requestLogin = (email) => ({ type: LOGIN_REQUESTED, email })

function* loginAsyncWatcher () {
  yield takeLatest([LOGIN_REQUESTED], loginAsyncWorker)
}

export function* loginAsyncWorker (action) {
  const email = action.email
  try {
    yield call(Api.checkEmail, email)
    yield put(logined(email))
  } catch (e) {
    console.error(e)
    yield put(loginError())
  }
}

export const sagas = [loginAsyncWatcher]

const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
