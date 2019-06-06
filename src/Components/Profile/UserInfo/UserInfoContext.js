import React, { useState, useEffect, useContext } from 'react';
import { ProfileContext } from '../ProfileContext';

const UserInfoContext = React.createContext();

const UserInfoProvider = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [infoEditable, setInfoEditable,] = useState(false);

    const { user, urlUserID } = useContext(ProfileContext);

    useEffect(() => {
        /* eslint-disable */
        if (user && !urlUserID) setInfoEditable(true);
    }, []);

    return (
        <UserInfoContext.Provider
            value={{
                editMode,
                setEditMode,
                infoEditable
            }}
        >
            {props.children}
        </UserInfoContext.Provider>
    )
};

export {
    UserInfoContext,
    UserInfoProvider
}