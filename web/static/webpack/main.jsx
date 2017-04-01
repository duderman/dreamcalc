import 'babel-polyfill' // generator support
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'
import App from 'components/App'
import Login from 'components/Login'

import initStore from 'store'

const store = initStore()

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Route path="/login" component={ Login } />
        <PrivateRoute path="/" component={ App } />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
