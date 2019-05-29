import React, { useState, useEffect } from 'react';
import { fire } from './../firebase';

const AuthContext = React.createContext();

const AuthProvider = (props) => {

    useEffect(() => {
        fire.auth()
            .onAuthStateChanged(user => setCurrentUser(user));
    });

    const [currentUser, setCurrentUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                currentUser: currentUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export {
    AuthContext,
    AuthProvider
};