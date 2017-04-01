import 'components/app.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from 'components/LoginForm'

class App extends Component {
  render () {
    return (
      <div className="app">
        <LoginForm />
      </div>
    )
  }
}

const mapState = state => ({ email: state.get('login').email })

export default connect(mapState)(App)
