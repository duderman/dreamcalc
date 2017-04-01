import 'components/LoginForm.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestLogin } from 'ducks/login'

class LoginForm extends Component {
  onButtonClick () {
    this.props.requestLogin(this.state.email)
  }

  onEmailChange () {
    const email = event.target.value
    this.setState({ ...this.state, email })
  }

  render () {
    return (
      <div className="login-form">
        <div className="login-form__label">Your email:</div>
        <input className="login-form__input" name="email" type="email" onChange={ this.onEmailChange.bind(this) } />
        <button className="login-form__btn" onClick={ this.onButtonClick.bind(this) }>Send</button>
      </div>
    )
  }
}

const mapState = state => ({ error: state.get('login') })
const mapDispatch = () => ({ requestLogin })

export default connect(mapState, mapDispatch)(LoginForm)

