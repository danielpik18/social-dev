import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../Contexts/AuthContext';

const PrivateRoute = ({ component: RouteComponent, provider: Provider, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps => (
                <Provider>
                    {currentUser ?
                        (

                            <RouteComponent {...routeProps} />

                        )
                        : (<Redirect to='/login' />)}
                </Provider>
            )}
        />

    );
}

export default PrivateRoute;