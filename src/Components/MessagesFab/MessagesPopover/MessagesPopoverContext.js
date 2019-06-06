import React, { useState } from 'react';

const MessagesPopoverContext = React.createContext();

const MessagesPopoverProvider = (props) => {
    const [currentView, setCurrentView] = useState('conversationsList');
    const [sortUnreadConversationsBy, setSortUnreadConversationsBy] = useState(null);

    return (
        <MessagesPopoverContext.Provider
            value={{
                currentView,
                setCurrentView,
                sortUnreadConversationsBy,
                setSortUnreadConversationsBy
            }}
        >
            {props.children}
        </MessagesPopoverContext.Provider>
    )
};

export {
    MessagesPopoverContext,
    MessagesPopoverProvider
}