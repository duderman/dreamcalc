import { combineReducers } from 'redux-immutable'
import { call, spawn } from 'redux-saga/effects'
import login, { sagas as loginSagas } from 'ducks/login'
import game from 'ducks/game'

const reducers = {
  login,
  game
}

export default combineReducers(reducers)

export function* rootSaga () {
  const sagas = [...loginSagas]

  yield sagas.map(saga =>
    spawn(function* () {
      let isSyncError = false
      while (!isSyncError) {
        isSyncError = true
        try {
          setTimeout(() => { isSyncError = false })
          yield call(saga)
        } catch (e) {
          if (isSyncError) {
            throw new Error(saga.name + ' was terminated because it threw an exception on startup.')
          }
          // handle exceptions here
        }
      }
    })
  )
}
