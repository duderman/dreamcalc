import 'components/app.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from 'components/LoginForm'

class App extends Component {
  render () {
    const { currentEmail } = this.props
    return (
      <div className="app">
        { currentEmail ? <div>{ currentEmail }</div> : <LoginForm /> }
      </div>
    )
  }
}

const mapState = state => ({ currentEmail: state.getIn(['login', 'email']) })

export default connect(mapState)(App)
