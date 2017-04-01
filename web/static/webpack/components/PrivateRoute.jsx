import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  render () {
    const { currentEmail, component, ...rest } = this.props

    return (
      <Route { ...rest } render={ props => (
        currentEmail ? (
          React.createElement(component, props)
        ) : (
          <Redirect to={ {
            pathname: '/login',
            state: { from: props.location }
          } }/>
        )
      ) }/>
    )
  }
}

const mapState = state => ({ currentEmail: state.getIn(['login', 'email']) })

export default connect(mapState)(PrivateRoute)
