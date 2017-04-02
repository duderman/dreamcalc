import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui'

import CurrentUser from 'components/CurrentUser'

import { logout } from 'ducks/login'
import { reset } from 'ducks/game'

class Header extends Component {
  onLogout () {
    const { logout, reset } = this.props
    reset()
    logout()
  }

  render () {
    const { email } = this.props
    return (
      <AppBar
        title="DreamCalc"
        iconElementLeft={ <span></span> }
        iconElementRight={ <CurrentUser email={ email } onLogout={ this.onLogout.bind(this) } /> }
      />
    )
  }
}

const mapState = state => ({ email: state.getIn(['login', 'email']) })
const mapDispatch = { logout, reset }

export default connect(mapState, mapDispatch)(Header)
