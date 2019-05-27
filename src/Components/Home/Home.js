import React from 'react';
import Register from '../Register/Register';

import { AuthContext } from './../../Contexts/AuthContext';

import { fire } from './../../firebase';

const Home = () => {
    return (
        <AuthContext.Consumer>
            {context => (
                context.currentUser ?
                    <div>
                        {
                            context.currentUser.uid
                        }
                    </div>
                    : <Register />
            )}
        </AuthContext.Consumer>
    );
}

export default Home;