import React, { useContext } from 'react';
import Register from '../Register/Register';
import { Redirect } from 'react-router-dom';

import { AuthContext } from './../../Contexts/AuthContext';

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        currentUser ?
            <Redirect to='/profile' />
            : <Register />
    );
}

export default Home;