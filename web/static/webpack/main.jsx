import 'babel-polyfill'
import './main.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import PrivateRoute from 'components/PrivateRoute'
import App from 'components/App'
import Login from 'components/Login'

import initStore from 'store'

injectTapEventPlugin()

const store = initStore()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <BrowserRouter>
        <div style={ { height: '100%' } }>
          <Route path="/login" component={ Login } />
          <PrivateRoute path="/" component={ App } />
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
