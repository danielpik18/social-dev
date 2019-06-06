import React, { useState, useEffect } from 'react';

const MessagesPopoverContext = React.createContext();

const MessagesPopoverProvider = (props) => {
    const [currentView, setCurrentView] = useState('conversationsList');
    const [sortUnreadConversationsBy, setSortUnreadConversationsBy] = useState(null);
    const [devConversationsUnreadMessages, setDevConversationsUnreadMessages] = useState(false);
    const [recConversationsUnreadMessages, setRecConversationsUnreadMessages] = useState(false);

    return (
        <MessagesPopoverContext.Provider
            value={{
                currentView,
                setCurrentView,
                sortUnreadConversationsBy,
                setSortUnreadConversationsBy,
                devConversationsUnreadMessages,
                setDevConversationsUnreadMessages,
                recConversationsUnreadMessages,
                setRecConversationsUnreadMessages
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