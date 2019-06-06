import React, { useState, useEffect } from 'react';
import { fire, reBase } from './../firebase';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);

    useEffect(() => {
        fire.auth()
            .onAuthStateChanged(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        if (currentUser) {
            const bindRef = reBase.bindToState(`users/${currentUser.uid}`, {
                context: {
                    setState: ({ currentUserData }) => setCurrentUserData({ ...currentUserData }),
                    state: { currentUserData }
                },
                state: 'currentUserData'
            })

            return () => {
                reBase.removeBinding(bindRef);
            }
        }
    }, [currentUser])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                currentUserData
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