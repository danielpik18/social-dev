import React, { useState, useEffect, useContext } from 'react';
import { MessagesPopoverContext } from '../MessagesPopoverContext';
import { reBase } from '../../../../firebase';

const ConversationViewContext = React.createContext();

const ConversationViewProvider = (props) => {
    const { setCurrentView } = useContext(MessagesPopoverContext);

    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentConversationUserData, setCurrentConversationUserData] = useState(null);
    const [currentConversationID, setCurrentConversationID] = useState(null);

    useEffect(() => {
        /* eslint-disable */

        if (currentConversationID) {
            reBase.bindToState(`users/${currentConversationID}`, {
                context: {
                    setState: ({ currentConversationUserData }) => setCurrentConversationUserData({ ...currentConversationUserData }),
                    state: { currentConversationUserData }
                },
                state: 'currentConversationUserData'
            });

            setCurrentView('conversation');
        }
    }, [currentConversationID]);

    return (
        <ConversationViewContext.Provider
            value={{
                currentConversation,
                setCurrentConversation,
                currentConversationID,
                setCurrentConversationID,
                currentConversationUserData,
                setCurrentConversationUserData
            }}
        >
            {props.children}
        </ConversationViewContext.Provider>
    )
};

export {
    ConversationViewContext,
    ConversationViewProvider
}
