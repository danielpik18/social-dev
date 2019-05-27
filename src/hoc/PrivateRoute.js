import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../Contexts/AuthContext';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    return (
        <AuthContext.Consumer>
            {context => (
                <Route
                    render={routeProps => (
                        context.currentUser ?
                            <RouteComponent authContext={context} {...routeProps} />
                            : (<Redirect to='/login' />)
                    )}
                />
            )}
        </AuthContext.Consumer>
    );
}

export default PrivateRoute;