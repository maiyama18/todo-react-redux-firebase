import React from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { clearData } from '../redux/firestore'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const AuthButton = props => {
  if (!isLoaded(props.auth)) return null

  if (isEmpty(props.auth)) {
    return (
      <div>
        <button onClick={() => props.firebase.login({ provider: 'github', type: 'popup' })}>
          Log in with Github
        </button>
      </div>
    )
  }

  return (
    <div>
      {props.auth.displayName}
      <button onClick={() => props.firebase.logout()}>
        Log out
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    clearData,
  }, dispatch),
})

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthButton)