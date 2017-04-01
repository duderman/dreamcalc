import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginForm from './LoginForm'

class Login extends Component {
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const redirectToReferrer = !!this.props.currentEmail

    if (redirectToReferrer) {
      return (
        <Redirect to={ from }/>
      )
    }

    return (
      <LoginForm />
    )
  }
}

const mapState = state => ({ currentEmail: state.getIn(['login', 'email']) })

export default connect(mapState)(Login)
