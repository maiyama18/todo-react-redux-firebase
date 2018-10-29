import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebaseConfig from '../firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

const initialState = {}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true,
  }),
]

const reduxDevToolsExtension = window.devToolsExtension
if (process.env.NODE_ENV === 'development' && typeof reduxDevToolsExtension === 'function') {
  enhancers.push(reduxDevToolsExtension())
}

const store = createStore(rootReducer, initialState, compose(...enhancers))

export default store