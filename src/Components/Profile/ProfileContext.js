import React, { useState } from 'react';

const ProfileContext = React.createContext();

const ProfileProvider = (props) => {
    const [user, setUser] = useState(null);
    const [urlUserID, setUrlUserID] = useState('');

    const changeUrlUserID = (id) => setUrlUserID(id);

    return (
        <ProfileContext.Provider
            value={{
                urlUserID,
                setUrlUserID,
                user,
                setUser
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    )
};

export {
    ProfileContext,
    ProfileProvider
}