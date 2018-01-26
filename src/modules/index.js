import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import { firestoreReducer as firestore } from 'redux-firestore'
import counter from './counter'
import login from './login'

export default combineReducers({
    routing,
    firebase,
    firestore,
    counter,
    login
})