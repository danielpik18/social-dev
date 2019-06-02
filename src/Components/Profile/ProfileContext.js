import React, { useState, useEffect } from 'react';

const ProfileContext = React.createContext();

const ProfileProvider = (props) => {
    const [user, setUser] = useState(null);
    const [urlUserID, setUrlUserID] = useState('');

    //console.log(user);

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