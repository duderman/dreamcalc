import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Map } from 'immutable'
import Api from 'api'

const initialState = Map({})

export default function reducer (currentState = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return currentState.set({ email: action.email, error: '' })
    case LOGIN_FAILED:
      return currentState.set({ error: action.error })
    default:
      return currentState
  }
}

const logined = (email) => ({ type: LOGIN_SUCCESS, email })
const loginError = (error) => ({ type: LOGIN_FAILED, error })

export const requestLogin = (email) => ({ type: LOGIN_REQUESTED, email })

function* loginAsyncWatcher () {
  yield takeLatest([LOGIN_REQUESTED], loginAsyncWorker)
}

export function* loginAsyncWorker (action) {
  const email = action.payload.email
  try {
    yield call(Api.checkEmail, email)
    yield put(logined(email))
  } catch (e) {
    yield put(loginError(e))
  }
}

export const sagas = [loginAsyncWatcher]

const LOGIN_REQUESTED = 'LOGIN_REQUESTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
