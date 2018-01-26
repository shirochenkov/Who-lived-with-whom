import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../modules'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'

const fbConfig = {

}
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

firebase.initializeApp(fbConfig)
firebase.firestore()

const initialState = {}
const enhancers = []
const middleware = [
    thunk
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
)

export default store