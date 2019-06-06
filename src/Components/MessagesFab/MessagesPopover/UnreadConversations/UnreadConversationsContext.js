import React, { useState } from 'react';

const UnreadConversationsContext = React.createContext();

const UnreadConversationsProvider = (props) => {
    const [userConversations, setUserConversations] = useState(null);
    const [conversationsUserData, setConversationsUserData] = useState(null);

    return (
        <UnreadConversationsContext.Provider
            value={{
                userConversations,
                setUserConversations,
                conversationsUserData,
                setConversationsUserData
            }}
        >
            {props.children}
        </UnreadConversationsContext.Provider>
    )
};

export {
    UnreadConversationsContext,
    UnreadConversationsProvider
}