import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../Contexts/AuthContext';

const PrivateRoute = ({ component: RouteComponent }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            render={routeProps => (
                currentUser ?
                    <RouteComponent {...routeProps} />
                    : (<Redirect to='/login' />)
            )}
        />

    );
}

export default PrivateRoute;