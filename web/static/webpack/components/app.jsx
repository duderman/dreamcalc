import 'components/App.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return (
      <div className="app">
        { this.props.currentEmail }
      </div>
    )
  }
}

const mapState = state => ({ currentEmail: state.getIn(['login', 'email']) })

export default connect(mapState)(App)
