import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

const PrivateRoute = ({firebase, component: Component, ...rest}) => {
    const storageKey = 'isAuth';

    const isAuthenticated = () => {
        return !!firebase.auth().currentUser || !!localStorage.getItem(storageKey);
    }

    return (
        <Route {...rest} render={renderProps => (
            isAuthenticated() ? (
                <Component {...renderProps} />
            ) : (
                <Redirect to={ {
                    pathname: '/login',
                    state: {from: renderProps.location}
                } } />
            )
        )}/>
    )
}

export default compose(
    firebaseConnect(),
    connect(({ firebase: { auth } }) => ({ auth }))
)(PrivateRoute)
